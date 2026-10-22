import { model, Schema, type Types } from "mongoose";

import {
  AGENT_JOB_STATUSES,
  AGENT_JOB_TYPES,
  type AgentJobStatus,
  type AgentJobType,
} from "./constants.js";

export interface AgentJobPayloadReference {
  rfpId: Types.ObjectId;
  expectedVersion: number;
}

export interface AgentJob {
  tenantId: Types.ObjectId;

  jobId: string;
  runId: string;
  rfpId: Types.ObjectId;

  jobType: AgentJobType;
  status: AgentJobStatus;

  availableAt: Date;

  claimedBy?: string | null;
  claimedAt?: Date | null;
  leaseExpiresAt?: Date | null;

  attemptCount: number;
  maximumAttempts: number;

  payloadReference: AgentJobPayloadReference;

  errorCode?: string | null;
  completedAt?: Date | null;
}

const payloadReferenceSchema = new Schema<AgentJobPayloadReference>(
  {
    rfpId: {
      type: Schema.Types.ObjectId,

      ref: "Rfp",

      required: true,

      immutable: true,
    },

    expectedVersion: {
      type: Number,

      required: true,

      min: 1,

      immutable: true,
    },
  },
  {
    _id: false,
  },
);

const agentJobSchema = new Schema<AgentJob>(
  {
    tenantId: {
      type: Schema.Types.ObjectId,

      ref: "Tenant",

      required: true,

      immutable: true,
    },

    jobId: {
      type: String,

      required: true,

      immutable: true,

      trim: true,

      minlength: 1,

      maxlength: 100,
    },

    runId: {
      type: String,

      required: true,

      immutable: true,

      trim: true,

      minlength: 1,

      maxlength: 100,
    },

    rfpId: {
      type: Schema.Types.ObjectId,

      ref: "Rfp",

      required: true,

      immutable: true,
    },

    jobType: {
      type: String,

      enum: AGENT_JOB_TYPES,

      required: true,

      immutable: true,
    },

    status: {
      type: String,

      enum: AGENT_JOB_STATUSES,

      required: true,

      default: "QUEUED",
    },

    availableAt: {
      type: Date,

      required: true,

      default: Date.now,
    },

    claimedBy: {
      type: String,

      default: null,

      trim: true,

      maxlength: 100,
    },

    claimedAt: {
      type: Date,

      default: null,
    },

    leaseExpiresAt: {
      type: Date,

      default: null,
    },

    attemptCount: {
      type: Number,

      required: true,

      default: 0,

      min: 0,
    },

    maximumAttempts: {
      type: Number,

      required: true,

      default: 2,

      min: 1,

      max: 5,
    },

    payloadReference: {
      type: payloadReferenceSchema,

      required: true,
    },

    errorCode: {
      type: String,

      default: null,

      trim: true,

      maxlength: 100,
    },

    completedAt: {
      type: Date,

      default: null,
    },
  },
  {
    timestamps: true,

    collection: "agentJobs",

    strict: "throw",
  },
);

/*
 * One unique application job identifier.
 */
agentJobSchema.index(
  {
    jobId: 1,
  },
  {
    unique: true,

    name: "uq_agent_jobs_job_id",
  },
);

/*
 * One job per AgentRun for the current workflow.
 *
 * If a future AgentRun may have several jobs,
 * change this from unique to a normal index and
 * introduce a task-sequence identifier.
 */
agentJobSchema.index(
  {
    runId: 1,
  },
  {
    unique: true,

    name: "uq_agent_jobs_run_id",
  },
);

/*
 * Supports atomic worker claiming:
 *
 * status + availableAt identify runnable jobs;
 * leaseExpiresAt identifies abandoned claims.
 */
agentJobSchema.index(
  {
    status: 1,

    availableAt: 1,

    leaseExpiresAt: 1,
  },
  {
    name: "ix_agent_jobs_claim",
  },
);

/*
 * Supports tenant-scoped workflow history.
 */
agentJobSchema.index(
  {
    tenantId: 1,

    rfpId: 1,

    createdAt: -1,
  },
  {
    name: "ix_agent_jobs_tenant_rfp_created",
  },
);

/*
 * Supports reconciliation of jobs held by a
 * worker whose lease has expired.
 */
agentJobSchema.index(
  {
    status: 1,

    leaseExpiresAt: 1,
  },
  {
    name: "ix_agent_jobs_expired_lease",
  },
);

export const AgentJobModel = model<AgentJob>("AgentJob", agentJobSchema);
