import { Schema, Types, model } from "mongoose";
import { RFP_VENDOR_STATUSES } from "./constants.js";

export interface RfpVendor {
  tenantId: Types.ObjectId;
  rfpId: Types.ObjectId;
  vendorId: Types.ObjectId;
  status: (typeof RFP_VENDOR_STATUSES)[number];
  matchScore?: number;
  matchReasons: string[];
  invitation?: {
    subject?: string;
    body?: string;
    approvedBy?: Types.ObjectId;
    approvedAt?: Date;
    sentAt?: Date;
    messageId?: string;
  };
  notes?: string;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
}
const invitation = new Schema(
  {
    subject: { type: String, trim: true, maxlength: 300 },
    body: { type: String, trim: true, maxlength: 10000 },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    approvedAt: Date,
    sentAt: Date,
    messageId: { type: String, trim: true, maxlength: 300 },
  },
  { _id: false },
);
const schema = new Schema<RfpVendor>(
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
    status: {
      type: String,
      enum: RFP_VENDOR_STATUSES,
      default: "SHORTLISTED",
      required: true,
    },
    matchScore: { type: Number, min: 0, max: 100 },
    matchReasons: { type: [String], default: [] },
    invitation: { type: invitation, default: () => ({}) },
    notes: { type: String, trim: true, maxlength: 3000 },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, collection: "rfpVendors", strict: "throw" },
);
schema.index(
  { tenantId: 1, rfpId: 1, vendorId: 1 },
  { unique: true, name: "uq_rfp_vendor_pair" },
);
schema.index(
  { tenantId: 1, rfpId: 1, status: 1 },
  { name: "ix_rfp_vendors_status" },
);
schema.index(
  { tenantId: 1, vendorId: 1, updatedAt: -1 },
  { name: "ix_rfp_vendors_vendor_history" },
);
export const RfpVendorModel = model<RfpVendor>("RfpVendor", schema);