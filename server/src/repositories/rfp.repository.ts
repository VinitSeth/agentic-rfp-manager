import {
  Types
} from "mongoose";

import {
  RfpModel
} from "../models/rfp.model.js";

import type {
  RequirementAnalysisOutput
} from "../validators/requirement-analysis.validator.js";

import type {
  ConfirmRequirementsInput,
  CreateRfpInput
} from "../validators/rfp.validators.js";

export interface TenantContext {
  tenantId: string;
  userId: string;
}

function toObjectId(
  value: string,
  fieldName: string
): Types.ObjectId {
  if (!Types.ObjectId.isValid(value)) {
    throw new Error(
      `${fieldName} is not a valid ObjectId`
    );
  }

  return new Types.ObjectId(value);
}

export class RfpRepository {
  async createDraft(
    context: TenantContext,
    input: CreateRfpInput
  ) {
    const tenantId =
      toObjectId(
        context.tenantId,
        "tenantId"
      );

    const userId =
      toObjectId(
        context.userId,
        "userId"
      );

    return RfpModel.create({
      tenantId,

      rfpNumber:
        input.rfpNumber,

      title:
        input.title,

      category:
        input.category,

      requirementBrief:
        input.requirementBrief,

      budget:
        input.budget,

      status:
        "DRAFT",

      createdBy:
        userId,

      updatedBy:
        userId,

      version:
        1
    });
  }

  async list(
    context: TenantContext
  ) {
    return RfpModel.find({
      tenantId:
        context.tenantId
    })
      .sort({
        updatedAt: -1
      })
      .lean();
  }

  async findById(
    context: TenantContext,
    rfpId: string
  ) {
    if (!Types.ObjectId.isValid(rfpId)) {
      return null;
    }

    return RfpModel.findOne({
      _id:
        rfpId,

      tenantId:
        context.tenantId
    }).lean();
  }

  async startRequirementAnalysis(
    context: TenantContext,
    rfpId: string,
    runId: string
  ) {
    if (!Types.ObjectId.isValid(rfpId)) {
      return null;
    }

    return RfpModel.findOneAndUpdate(
      {
        _id:
          rfpId,

        tenantId:
          context.tenantId,

        status:
          "DRAFT"
      },
      {
        $set: {
          status:
            "ANALYZING_REQUIREMENTS",

          requirementAnalysisRunId:
            runId,

          updatedBy:
            context.userId
        },

        $inc: {
          version:
            1
        }
      },
      {
        returnDocument:
          "after",

        runValidators:
          true
      }
    ).lean();
  }

  async saveProposedRequirements(
    context: TenantContext,
    rfpId: string,
    runId: string,
    proposedRequirements:
      RequirementAnalysisOutput
  ) {
    if (!Types.ObjectId.isValid(rfpId)) {
      return null;
    }

    return RfpModel.findOneAndUpdate(
      {
        _id:
          rfpId,

        tenantId:
          context.tenantId,

        status:
          "ANALYZING_REQUIREMENTS",

        requirementAnalysisRunId:
          runId
      },
      {
        $set: {
          proposedRequirements,

          status:
            "REQUIREMENTS_REVIEW",

          updatedBy:
            context.userId
        },

        $inc: {
          version:
            1
        }
      },
      {
        returnDocument:
          "after",

        runValidators:
          true
      }
    ).lean();
  }

  async restoreDraftAfterAnalysisFailure(
    context: TenantContext,
    rfpId: string,
    runId: string
  ) {
    if (!Types.ObjectId.isValid(rfpId)) {
      return null;
    }

    return RfpModel.findOneAndUpdate(
      {
        _id:
          rfpId,

        tenantId:
          context.tenantId,

        status:
          "ANALYZING_REQUIREMENTS",

        requirementAnalysisRunId:
          runId
      },
      {
        $set: {
          status:
            "DRAFT",

          updatedBy:
            context.userId
        },

        $unset: {
          requirementAnalysisRunId:
            ""
        },

        $inc: {
          version:
            1
        }
      },
      {
        returnDocument:
          "after",

        runValidators:
          true
      }
    ).lean();
  }

  async confirmRequirements(
    context: TenantContext,
    rfpId: string,
    input: ConfirmRequirementsInput
  ) {
    if (!Types.ObjectId.isValid(rfpId)) {
      return null;
    }

    const confirmedRequirements = {
      summary:
        input.requirements.summary,

      technical:
        input.requirements.technical.map(
          (item) => ({
            ...item,
            source:
              "USER_CONFIRMED" as const
          })
        ),

      commercial:
        input.requirements.commercial.map(
          (item) => ({
            ...item,
            source:
              "USER_CONFIRMED" as const
          })
        ),

      mandatory:
        input.requirements.mandatory.map(
          (item) => ({
            ...item,
            source:
              "USER_CONFIRMED" as const
          })
        ),

      assumptions:
        input.requirements.assumptions,

      openQuestions:
        input.requirements.openQuestions
    };

    return RfpModel.findOneAndUpdate(
      {
        _id:
          rfpId,

        tenantId:
          context.tenantId,

        status:
          "REQUIREMENTS_REVIEW",

        version:
          input.expectedVersion
      },
      {
        $set: {
          requirements:
            confirmedRequirements,

          updatedBy:
            context.userId
        },

        $inc: {
          version:
            1
        }
      },
      {
        returnDocument:
          "after",

        runValidators:
          true
      }
    ).lean();
  }
}