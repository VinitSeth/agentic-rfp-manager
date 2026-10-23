import { Schema, Types, model } from "mongoose";
import { RFP_STATUSES, type RfpStatus } from "./constants.js";

export interface RequirementItem {
  key: string;
  description: string;
  priority: "MUST" | "SHOULD" | "COULD";
  source: "USER" | "AI_PROPOSED" | "USER_CONFIRMED";
}

export interface RequirementSet {
  summary: string;
  technical: RequirementItem[];
  commercial: RequirementItem[];
  mandatory: RequirementItem[];
  assumptions: string[];
  openQuestions: string[];
}

export interface Rfp {
  tenantId: Types.ObjectId;
  rfpNumber: string;
  title: string;
  category: string;

  requirementBrief: string;

  proposedRequirements?: RequirementSet;
  requirements?: RequirementSet;

  budget?: {
    amount: number;
    currency: string;
  };

  submissionDeadline?: Date | null;
  status: RfpStatus;

  requirementAnalysisRunId?: string | null;

  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;

  version: number;
}

const requirementItemSchema = new Schema<RequirementItem>(
  {
    key: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    priority: {
      type: String,
      enum: ["MUST", "SHOULD", "COULD"],
      required: true,
    },
    source: {
      type: String,
      enum: ["USER", "AI_PROPOSED", "USER_CONFIRMED"],
      required: true,
    },
  },
  {
    _id: false,
  },
);

const requirementSetSchema = new Schema<RequirementSet>(
  {
    summary: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    technical: {
      type: [requirementItemSchema],
      default: [],
    },
    commercial: {
      type: [requirementItemSchema],
      default: [],
    },
    mandatory: {
      type: [requirementItemSchema],
      default: [],
    },
    assumptions: {
      type: [String],
      default: [],
    },
    openQuestions: {
      type: [String],
      default: [],
    },
  },
  {
    _id: false,
  },
);

const rfpSchema = new Schema<Rfp>(
  {
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      immutable: true,
    },
    rfpNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      maxlength: 50,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      maxlength: 100,
    },
    requirementBrief: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
      maxlength: 20_000,
    },
    proposedRequirements: {
      type: requirementSetSchema,
      required: false,
    },
    requirements: {
      type: requirementSetSchema,
      required: false,
    },
    budget: {
      amount: {
        type: Number,
        min: 0,
      },
      currency: {
        type: String,
        trim: true,
        uppercase: true,
        minlength: 3,
        maxlength: 3,
      },
    },
    submissionDeadline: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: RFP_STATUSES,
      required: true,
      default: "DRAFT",
    },
    requirementAnalysisRunId: {
      type: String,
      default: null,
      maxlength: 100,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    version: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
  },
  {
    timestamps: true,
    collection: "rfps",
    strict: "throw",
    optimisticConcurrency: true,
  },
);

rfpSchema.index(
  {
    tenantId: 1,
    rfpNumber: 1,
  },
  {
    unique: true,
    name: "uq_rfps_tenant_rfp_number",
  },
);

rfpSchema.index(
  {
    tenantId: 1,
    status: 1,
    updatedAt: -1,
  },
  {
    name: "ix_rfps_tenant_status_updated",
  },
);

rfpSchema.index(
  {
    tenantId: 1,
    createdBy: 1,
    createdAt: -1,
  },
  {
    name: "ix_rfps_tenant_creator_created",
  },
);

export const RfpModel = model<Rfp>("Rfp", rfpSchema);
