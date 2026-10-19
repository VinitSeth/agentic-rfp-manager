import { Schema, Types, model } from "mongoose";
import {
  AGENT_RUN_STATUSES,
  VERIFICATION_STATUSES,
  type AgentRunStatus,
  type VerificationStatus
} from "./constants.js";

export interface AgentFinding {
  code: string;
  severity: "INFO" | "WARNING" | "ERROR" | "BLOCKING";
  message: string;
  field?: string;
}

export interface AgentRun {
  tenantId: Types.ObjectId;
  rfpId: Types.ObjectId;

  runId: string;
  agentName: string;
  agentVersion: string;

  status: AgentRunStatus;
  verificationStatus: VerificationStatus;

  attemptCount: number;
  maximumAttempts: number;

  promptVersion: string;
  modelAdapter: "MOCK" | "GENERATIVE_ENGINE";
  modelId?: string | null;
  providerRequestId?: string | null;

  inputHash?: string | null;
  output?: unknown;

  findings: AgentFinding[];

  errorCode?: string | null;
  errorMessage?: string | null;

  startedAt?: Date | null;
  completedAt?: Date | null;
  durationMs?: number | null;

  createdBy: Types.ObjectId;
}

const findingSchema = new Schema<AgentFinding>(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    severity: {
      type: String,
      enum: [
        "INFO",
        "WARNING",
        "ERROR",
        "BLOCKING"
      ],
      required: true
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000
    },
    field: {
      type: String,
      trim: true,
      maxlength: 200
    }
  },
  {
    _id: false
  }
);

const agentRunSchema = new Schema<AgentRun>(
  {
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      immutable: true
    },
    rfpId: {
      type: Schema.Types.ObjectId,
      ref: "Rfp",
      required: true,
      immutable: true
    },
    runId: {
      type: String,
      required: true,
      immutable: true,
      trim: true,
      maxlength: 100
    },
    agentName: {
      type: String,
      required: true,
      immutable: true,
      trim: true,
      maxlength: 100
    },
    agentVersion: {
      type: String,
      required: true,
      immutable: true,
      trim: true,
      maxlength: 50
    },
    status: {
      type: String,
      enum: AGENT_RUN_STATUSES,
      required: true,
      default: "QUEUED"
    },
    verificationStatus: {
      type: String,
      enum: VERIFICATION_STATUSES,
      required: true,
      default: "NOT_STARTED"
    },
    attemptCount: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    maximumAttempts: {
      type: Number,
      required: true,
      default: 2,
      min: 1,
      max: 3
    },
    promptVersion: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    modelAdapter: {
      type: String,
      enum: ["MOCK", "GENERATIVE_ENGINE"],
      required: true,
      default: "MOCK"
    },
    modelId: {
      type: String,
      default: null,
      maxlength: 200
    },
    providerRequestId: {
      type: String,
      default: null,
      maxlength: 200
    },
    inputHash: {
      type: String,
      default: null,
      maxlength: 128
    },
    output: {
      type: Schema.Types.Mixed,
      default: null
    },
    findings: {
      type: [findingSchema],
      default: []
    },
    errorCode: {
      type: String,
      default: null,
      maxlength: 100
    },
    errorMessage: {
      type: String,
      default: null,
      maxlength: 2000
    },
    startedAt: {
      type: Date,
      default: null
    },
    completedAt: {
      type: Date,
      default: null
    },
    durationMs: {
      type: Number,
      default: null,
      min: 0
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true
    }
  },
  {
    timestamps: true,
    collection: "agentRuns",
    strict: "throw"
  }
);

agentRunSchema.index(
  { runId: 1 },
  {
    unique: true,
    name: "uq_agent_runs_run_id"
  }
);

agentRunSchema.index(
  {
    tenantId: 1,
    rfpId: 1,
    createdAt: -1
  },
  {
    name: "ix_agent_runs_tenant_rfp_created"
  }
);

agentRunSchema.index(
  {
    tenantId: 1,
    status: 1,
    createdAt: 1
  },
  {
    name: "ix_agent_runs_tenant_status_created"
  }
);

export const AgentRunModel = model<AgentRun>(
  "AgentRun",
  agentRunSchema
);