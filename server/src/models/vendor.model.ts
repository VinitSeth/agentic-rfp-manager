import { Schema, Types, model } from "mongoose";
import { VENDOR_STATUSES } from "./constants.js";

export interface Vendor {
  tenantId: Types.ObjectId;
  name: string;
  vendorCode: string;
  status: (typeof VENDOR_STATUSES)[number];
  description?: string;
  categories: string[];
  strengths: string[];
  country?: string;
  city?: string;
  website?: string;
  contactName?: string;
  contactEmail?: string;
  certifications: string[];
  tags: string[];
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
}
const schema = new Schema<Vendor>(
  {
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      immutable: true,
    },
    name: { type: String, required: true, trim: true, maxlength: 200 },
    vendorCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      maxlength: 60,
    },
    status: {
      type: String,
      enum: VENDOR_STATUSES,
      default: "ACTIVE",
      required: true,
    },
    description: { type: String, trim: true, maxlength: 3000 },
    categories: { type: [String], default: [] },
    strengths: { type: [String], default: [] },
    country: { type: String, trim: true },
    city: { type: String, trim: true },
    website: { type: String, trim: true, maxlength: 500 },
    contactName: { type: String, trim: true, maxlength: 150 },
    contactEmail: { type: String, trim: true, lowercase: true, maxlength: 254 },
    certifications: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, collection: "vendors", strict: "throw" },
);
schema.index(
  { tenantId: 1, vendorCode: 1 },
  { unique: true, name: "uq_vendors_tenant_code" },
);
schema.index(
  { tenantId: 1, status: 1, name: 1 },
  { name: "ix_vendors_tenant_status_name" },
);
schema.index(
  { tenantId: 1, categories: 1 },
  { name: "ix_vendors_tenant_categories" },
);
export const VendorModel = model<Vendor>("Vendor", schema);