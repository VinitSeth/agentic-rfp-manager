import { Schema, Types, model } from "mongoose";
import { PROPOSAL_STATUSES } from "./constants.js";

export interface Proposal {
  tenantId: Types.ObjectId;
  rfpId: Types.ObjectId;
  vendorId: Types.ObjectId;
  rfpVendorId?: Types.ObjectId;
  status: (typeof PROPOSAL_STATUSES)[number];
  file: {
    originalName: string;
    storageKey: string;
    mimeType: string;
    sizeBytes: number;
    checksum?: string;
  };
  receivedAt: Date;
  extracted?: {
    summary?: string;
    proposedPrice?: number;
    currency?: string;
    deliveryDays?: number;
    answers: Array<{
      requirementKey: string;
      answer: string;
      evidence?: string;
      confidence?: number;
    }>;
    risks: string[];
    assumptions: string[];
    openQuestions: string[];
  };
  validationIssues: Array<{
    code: string;
    message: string;
    field?: string;
    severity: "INFO" | "WARNING" | "ERROR";
  }>;
  processingRunId?: string;
  reviewedBy?: Types.ObjectId;
  reviewedAt?: Date;
  createdBy: Types.ObjectId;
}

const answer = new Schema(
  {
    requirementKey: { type: String, required: true, maxlength: 100 },
    answer: { type: String, required: true, maxlength: 10000 },
    evidence: { type: String, maxlength: 5000 },
    confidence: { type: Number, min: 0, max: 1 },
  },
  { _id: false },
);
const issue = new Schema(
  {
    code: { type: String, required: true, maxlength: 100 },
    message: { type: String, required: true, maxlength: 2000 },
    field: { type: String, maxlength: 200 },
    severity: {
      type: String,
      enum: ["INFO", "WARNING", "ERROR"],
      required: true,
    },
  },
  { _id: false },
);
const schema = new Schema<Proposal>(
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
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      immutable: true,
    },
    rfpVendorId: { type: Schema.Types.ObjectId, ref: "RfpVendor" },
    status: {
      type: String,
      enum: PROPOSAL_STATUSES,
      default: "UPLOADED",
      required: true,
    },
    file: {
      originalName: { type: String, required: true, maxlength: 255 },
      storageKey: { type: String, required: true, maxlength: 1000 },
      mimeType: { type: String, required: true, maxlength: 150 },
      sizeBytes: { type: Number, required: true, min: 0 },
      checksum: { type: String, maxlength: 128 },
    },
    receivedAt: { type: Date, default: Date.now, required: true },
    extracted: {
      summary: { type: String, maxlength: 10000 },
      proposedPrice: { type: Number, min: 0 },
      currency: { type: String, uppercase: true, minlength: 3, maxlength: 3 },
      deliveryDays: { type: Number, min: 0 },
      answers: { type: [answer], default: [] },
      risks: { type: [String], default: [] },
      assumptions: { type: [String], default: [] },
      openQuestions: { type: [String], default: [] },
    },
    validationIssues: { type: [issue], default: [] },
    processingRunId: { type: String, maxlength: 100 },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
    reviewedAt: Date,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
  },
  { timestamps: true, collection: "proposals", strict: "throw" },
);
schema.index(
  { tenantId: 1, rfpId: 1, status: 1, receivedAt: -1 },
  { name: "ix_proposals_rfp_status_received" },
);
schema.index(
  { tenantId: 1, vendorId: 1, receivedAt: -1 },
  { name: "ix_proposals_vendor_received" },
);
export const ProposalModel = model<Proposal>("Proposal", schema);