import { Schema, model } from "mongoose";
import { TENANT_STATUSES, type TenantStatus } from "./constants.js";

export interface Tenant {
  name: string;
  slug: string;
  status: TenantStatus;
  settings: {
    currency: string;
    timezone: string;
  };
}

const tenantSchema = new Schema<Tenant>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 60,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    },
    status: {
      type: String,
      enum: TENANT_STATUSES,
      default: "ACTIVE",
      required: true,
    },
    settings: {
      currency: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        minlength: 3,
        maxlength: 3,
        default: "INR",
      },
      timezone: {
        type: String,
        required: true,
        trim: true,
        default: "Asia/Kolkata",
      },
    },
  },
  {
    timestamps: true,
    collection: "tenants",
    strict: "throw",
  },
);

tenantSchema.index(
  { slug: 1 },
  {
    unique: true,
    name: "uq_tenants_slug",
  },
);

export const TenantModel = model<Tenant>("Tenant", tenantSchema);
