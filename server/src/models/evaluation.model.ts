import { Schema, Types, model } from "mongoose";
import { EVALUATION_STATUSES } from "./constants.js";

export interface Evaluation {
  tenantId: Types.ObjectId;
  rfpId: Types.ObjectId;
  status: (typeof EVALUATION_STATUSES)[number];
  criteria: Array<{
    key: string;
    label: string;
    description?: string;
    weight: number;
    maxScore: number;
  }>;
  vendorScores: Array<{
    vendorId: Types.ObjectId;
    proposalId?: Types.ObjectId;
    scores: Array<{
      criterionKey: string;
      score: number;
      rationale?: string;
      evidence?: string;
    }>;
    totalScore: number;
    evaluatorNotes?: string;
  }>;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  completedAt?: Date;
  approvedBy?: Types.ObjectId;
  approvedAt?: Date;
}
const criterion = new Schema(
  {
    key: { type: String, required: true, maxlength: 100 },
    label: { type: String, required: true, maxlength: 200 },
    description: { type: String, maxlength: 2000 },
    weight: { type: Number, required: true, min: 0, max: 100 },
    maxScore: { type: Number, required: true, min: 1, max: 100 },
  },
  { _id: false },
);
const vendorScore = new Schema(
  {
    vendorId: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
    proposalId: { type: Schema.Types.ObjectId, ref: "Proposal" },
    scores: [
      {
        criterionKey: { type: String, required: true, maxlength: 100 },
        score: { type: Number, required: true, min: 0, max: 100 },
        rationale: { type: String, maxlength: 3000 },
        evidence: { type: String, maxlength: 5000 },
      },
    ],
    totalScore: { type: Number, required: true, min: 0, max: 100 },
    evaluatorNotes: { type: String, maxlength: 5000 },
  },
  { _id: false },
);
const schema = new Schema<Evaluation>(
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
    status: {
      type: String,
      enum: EVALUATION_STATUSES,
      default: "DRAFT",
      required: true,
    },
    criteria: { type: [criterion], default: [] },
    vendorScores: { type: [vendorScore], default: [] },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    completedAt: Date,
    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    approvedAt: Date,
  },
  { timestamps: true, collection: "evaluations", strict: "throw" },
);
schema.index(
  { tenantId: 1, rfpId: 1 },
  { unique: true, name: "uq_evaluations_tenant_rfp" },
);
schema.index(
  { tenantId: 1, status: 1, updatedAt: -1 },
  { name: "ix_evaluations_status_updated" },
);
export const EvaluationModel = model<Evaluation>("Evaluation", schema);