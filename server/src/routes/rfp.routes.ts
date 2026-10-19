import { randomUUID } from "node:crypto";
import { Router } from "express";
import { authenticateJwt } from "../middleware/auth.middleware.js";
import { resolveTenantContext } from "../middleware/tenant-context.middleware.js";
import { requirePermission } from "../middleware/permission.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { AgentRunModel } from "../models/agent-run.model.js";
import { RfpRepository } from "../repositories/rfp.repository.js";
import { executeRequirementAnalysisAgent } from "../agents/requirement-analysis.agent.js";
import { confirmRequirementsSchema, createRfpSchema } from "../validators/rfp.validators.js";
import { getRouteParameter } from "../utils/request.utils.js";

const router = Router();

const rfpRepository = new RfpRepository();

/*
 * Every RFP endpoint requires:
 *
 * 1. Valid JWT
 * 2. Verified user record
 * 3. Verified active tenant membership
 *
 * Individual routes additionally check permissions.
 */
router.use(authenticateJwt, resolveTenantContext);

/*
 * GET /api/rfps
 *
 * Return only RFPs owned by the active tenant.
 */
router.get(
  "/",

  requirePermission("rfp:read"),

  async (req, res, next) => {
    try {
      const rfps = await rfpRepository.list({
        tenantId: req.tenant!.id,
        userId: req.tenant!.userId,
      });

      res.status(200).json({
        items: rfps,
      });
    } catch (error) {
      next(error);
    }
  },
);

/*
 * POST /api/rfps
 *
 * Create a tenant-scoped DRAFT RFP.
 */
router.post(
  "/",

  requirePermission("rfp:create"),

  validateBody(createRfpSchema),

  async (req, res, next) => {
    try {
      const rfp = await rfpRepository.createDraft(
        {
          tenantId: req.tenant!.id,
          userId: req.tenant!.userId,
        },
        {
          rfpNumber: req.body.rfpNumber,

          title: req.body.title,

          category: req.body.category,

          requirementBrief: req.body.requirementBrief,

          budget: req.body.budget,
        },
      );

      res.status(201).json({
        message: "RFP draft created successfully",

        rfp,
      });
    } catch (error) {
      next(error);
    }
  },
);

/*
 * GET /api/rfps/:rfpId
 *
 * Return one RFP only if it belongs to the
 * active tenant.
 */
router.get(
  "/:rfpId",

  requirePermission("rfp:read"),

  async (req, res, next) => {
    try {
      const rfpId = getRouteParameter(req, "rfpId");

      if (!rfpId) {
        res.status(400).json({
          message: "A valid RFP ID is required",
        });

        return;
      }

      const rfp = await rfpRepository.findById(
        {
          tenantId: req.tenant!.id,

          userId: req.tenant!.userId,
        },
        rfpId,
      );

      if (!rfp) {
        /*
         * Return 404 for both:
         * - record does not exist
         * - record belongs to another tenant
         *
         * This avoids disclosing cross-tenant
         * resource existence.
         */
        res.status(404).json({
          message: "RFP not found",
        });

        return;
      }

      res.status(200).json({
        rfp,
      });
    } catch (error) {
      next(error);
    }
  },
);

/*
 * POST /api/rfps/:rfpId/analyze-requirements
 *
 * First POC implementation:
 *
 * 1. Verify RFP is DRAFT.
 * 2. Create AgentRun.
 * 3. Move RFP to ANALYZING_REQUIREMENTS.
 * 4. Execute mock Requirement Analysis Agent.
 * 5. Validate agent output.
 * 6. Save proposedRequirements.
 * 7. Move RFP to REQUIREMENTS_REVIEW.
 *
 * This implementation runs synchronously for the
 * first POC. Later, move the execution to a queue
 * or background worker before connecting a
 * potentially long-running live AI endpoint.
 */
router.post(
  "/:rfpId/analyze-requirements",

  requirePermission("rfp:analyze"),

  async (req, res, next) => {
    const runId = randomUUID();

    try {
      const rfpId = getRouteParameter(req, "rfpId");

      if (!rfpId) {
        res.status(400).json({
          message: "A valid RFP ID is required",
        });

        return;
      }

      const context = {
        tenantId: req.tenant!.id,

        userId: req.tenant!.userId,
      };

      const rfp = await rfpRepository.findById(context, rfpId);

      if (!rfp) {
        res.status(404).json({
          message: "RFP not found",
        });

        return;
      }

      if (rfp.status !== "DRAFT") {
        res.status(409).json({
          message:
            "Requirement analysis can only start when the RFP is in DRAFT status",

          currentStatus: rfp.status,
        });

        return;
      }

      const startedAt = new Date();

      await AgentRunModel.create({
        tenantId: req.tenant!.id,

        rfpId: rfp._id,

        runId,

        agentName: "requirement-analysis",

        agentVersion: "1.0.0",

        status: "RUNNING",

        verificationStatus: "NOT_STARTED",

        attemptCount: 1,

        maximumAttempts: 2,

        promptVersion: "1.0",

        modelAdapter: "MOCK",

        findings: [],

        startedAt,

        createdBy: req.tenant!.userId,
      });

      const analyzingRfp = await rfpRepository.startRequirementAnalysis(
        context,
        rfpId,
        runId,
      );

      if (!analyzingRfp) {
        await AgentRunModel.updateOne(
          {
            tenantId: req.tenant!.id,

            runId,
          },
          {
            $set: {
              status: "CANCELLED",

              errorCode: "RFP_STATE_CONFLICT",

              errorMessage: "RFP state changed before analysis started",

              completedAt: new Date(),
            },
          },
        );

        res.status(409).json({
          message: "RFP status changed before requirement analysis could start",
        });

        return;
      }

      const agentResult = await executeRequirementAnalysisAgent({
        requirementBrief: analyzingRfp.requirementBrief,
      });

      if (agentResult.status !== "SUCCEEDED" || !agentResult.output) {
        const completedAt = new Date();

        await AgentRunModel.updateOne(
          {
            tenantId: req.tenant!.id,

            runId,
          },
          {
            $set: {
              status: "FAILED",

              verificationStatus: "SCHEMA_FAILED",

              findings: agentResult.findings,

              errorCode: "REQUIREMENT_ANALYSIS_VALIDATION_FAILED",

              errorMessage:
                "Requirement Analysis Agent output failed validation",

              completedAt,

              durationMs: completedAt.getTime() - startedAt.getTime(),
            },
          },
        );

        /*
         * Restore the RFP to the last safe state.
         * The original requirementBrief remains
         * unchanged.
         */
        await rfpRepository.restoreDraftAfterAnalysisFailure(
          context,
          rfpId,
          runId,
        );

        res.status(422).json({
          message: "Requirement analysis output failed validation",

          runId,

          findings: agentResult.findings,
        });

        return;
      }

      const completedAt = new Date();

      const reviewedRfp = await rfpRepository.saveProposedRequirements(
        context,
        rfpId,
        runId,
        agentResult.output,
      );

      if (!reviewedRfp) {
        await AgentRunModel.updateOne(
          {
            tenantId: req.tenant!.id,

            runId,
          },
          {
            $set: {
              status: "FAILED",

              verificationStatus: "RULES_FAILED",

              errorCode: "RFP_UPDATE_CONFLICT",

              errorMessage:
                "The RFP could not accept the agent output because its state changed",

              completedAt,

              durationMs: completedAt.getTime() - startedAt.getTime(),
            },
          },
        );

        res.status(409).json({
          message:
            "RFP state changed before the proposed requirements could be saved",

          runId,
        });

        return;
      }

      await AgentRunModel.updateOne(
        {
          tenantId: req.tenant!.id,

          runId,
        },
        {
          $set: {
            status: "SUCCEEDED",

            verificationStatus: "SCHEMA_VALID",

            output: agentResult.output,

            findings: agentResult.findings,

            completedAt,

            durationMs: completedAt.getTime() - startedAt.getTime(),
          },
        },
      );

      res.status(200).json({
        message: "Requirement analysis completed successfully",

        runId,

        agentRunStatus: "SUCCEEDED",

        verificationStatus: "SCHEMA_VALID",

        rfp: reviewedRfp,
      });
    } catch (error) {
      const completedAt = new Date();

      /*
       * This update is best effort.
       *
       * If the error occurred before AgentRun creation,
       * updateOne simply matches no record.
       */
      await AgentRunModel.updateOne(
        {
          tenantId: req.tenant?.id,

          runId,
        },
        {
          $set: {
            status: "FAILED",

            errorCode: "REQUIREMENT_ANALYSIS_UNEXPECTED_ERROR",

            errorMessage:
              error instanceof Error
                ? error.message
                : "Unexpected requirement analysis error",

            completedAt,
          },
        },
      ).catch(() => {
        /*
         * Do not replace the original error if error
         * recording also fails.
         */
      });

      next(error);
    }
  },
);

/*
 * PUT /api/rfps/:rfpId/requirements
 *
 * Save user-reviewed requirements.
 *
 * This does not submit the RFP for formal approval.
 * It keeps the RFP in REQUIREMENTS_REVIEW so the
 * user may continue editing.
 */
router.put(
  "/:rfpId/requirements",

  requirePermission("rfp:review"),

  validateBody(confirmRequirementsSchema),

  async (req, res, next) => {
    try {
      const rfpId = getRouteParameter(req, "rfpId");

      if (!rfpId) {
        res.status(400).json({
          message: "A valid RFP ID is required",
        });

        return;
      }

      const context = {
        tenantId: req.tenant!.id,

        userId: req.tenant!.userId,
      };

      /*
       * First perform a tenant-scoped lookup so
       * status/version conflicts can be reported
       * more clearly without exposing another
       * tenant's resource.
       */
      const existingRfp = await rfpRepository.findById(context, rfpId);

      if (!existingRfp) {
        res.status(404).json({
          message: "RFP not found",
        });

        return;
      }

      if (existingRfp.status !== "REQUIREMENTS_REVIEW") {
        res.status(409).json({
          message:
            "Requirements can only be confirmed while the RFP is in REQUIREMENTS_REVIEW",

          currentStatus: existingRfp.status,
        });

        return;
      }

      if (existingRfp.version !== req.body.expectedVersion) {
        res.status(409).json({
          message: "The RFP has changed since it was loaded",

          currentVersion: existingRfp.version,
        });

        return;
      }

      const updatedRfp = await rfpRepository.confirmRequirements(
        context,
        rfpId,
        req.body,
      );

      if (!updatedRfp) {
        res.status(409).json({
          message:
            "The RFP could not be updated because its state or version changed",
        });

        return;
      }

      res.status(200).json({
        message: "Requirements saved successfully",

        rfp: updatedRfp,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
