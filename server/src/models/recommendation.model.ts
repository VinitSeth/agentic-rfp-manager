import { Schema, Types, model } from "mongoose";
import { RECOMMENDATION_STATUSES } from "./constants.js";

export interface Recommendation {
  tenantId: Types.ObjectId;
  rfpId: Types.ObjectId;
  evaluationId?: Types.ObjectId;
  status: (typeof RECOMMENDATION_STATUSES)[number];
  generatedByRunId?: string;
  items: Array<{
    vendorId: Types.ObjectId;
    proposalId?: Types.ObjectId;
    rank: number;
    score: number;
    recommended: boolean;
    rationale: string[];
    strengths: string[];
    risks: string[];
    gaps: string[];
  }>;
  overallSummary?: string;
  decisionNotes?: string;
  createdBy: Types.ObjectId;
  reviewedBy?: Types.ObjectId;
  reviewedAt?: Date;
}
const item = new Schema(
  {
    vendorId: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
    proposalId: { type: Schema.Types.ObjectId, ref: "Proposal" },
    rank: { type: Number, required: true, min: 1 },
    score: { type: Number, required: true, min: 0, max: 100 },
    recommended: { type: Boolean, default: false },
    rationale: { type: [String], default: [] },
    strengths: { type: [String], default: [] },
    risks: { type: [String], default: [] },
    gaps: { type: [String], default: [] },
  },
  { _id: false },
);
const schema = new Schema<Recommendation>(
  {
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      immutable: true,
    },
    rfpId: {
      type: Schema.Types.ObjectId,
      ref: "Rfp",
      required: true,
      immutable: true,
    },
    evaluationId: { type: Schema.Types.ObjectId, ref: "Evaluation" },
    status: {
      type: String,
      enum: RECOMMENDATION_STATUSES,
      default: "DRAFT",
      required: true,
    },
    generatedByRunId: { type: String, maxlength: 100 },
    items: { type: [item], default: [] },
    overallSummary: { type: String, maxlength: 10000 },
    decisionNotes: { type: String, maxlength: 5000 },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
    reviewedAt: Date,
  },
  { timestamps: true, collection: "recommendations", strict: "throw" },
);
schema.index(
  { tenantId: 1, rfpId: 1, createdAt: -1 },
  { name: "ix_recommendations_rfp_created" },
);
schema.index(
  { tenantId: 1, status: 1, updatedAt: -1 },
  { name: "ix_recommendations_status_updated" },
);
export const RecommendationModel = model<Recommendation>(
  "Recommendation",
  schema,
);