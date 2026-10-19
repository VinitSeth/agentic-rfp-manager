import { Schema, Types, model } from "mongoose";
import {
  MEMBERSHIP_STATUSES,
  TENANT_ROLES,
  type MembershipStatus,
  type TenantRole,
} from "./constants.js";

export interface TenantMembership {
  tenantId: Types.ObjectId;
  userId: Types.ObjectId;
  role: TenantRole;
  permissions: string[];
  status: MembershipStatus;
}

const tenantMembershipSchema = new Schema<TenantMembership>(
  {
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      immutable: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    role: {
      type: String,
      enum: TENANT_ROLES,
      required: true,
    },
    permissions: {
      type: [String],
      default: [],
      validate: {
        validator: (permissions: string[]) => permissions.length <= 100,
        message: "A membership cannot have more than 100 permissions",
      },
    },
    status: {
      type: String,
      enum: MEMBERSHIP_STATUSES,
      required: true,
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
    collection: "tenantMemberships",
    strict: "throw",
  },
);

tenantMembershipSchema.index(
  {
    tenantId: 1,
    userId: 1,
  },
  {
    unique: true,
    name: "uq_membership_tenant_user",
  },
);

tenantMembershipSchema.index(
  {
    userId: 1,
    status: 1,
  },
  {
    name: "ix_membership_user_status",
  },
);

tenantMembershipSchema.index(
  {
    tenantId: 1,
    status: 1,
    role: 1,
  },
  {
    name: "ix_membership_tenant_status_role",
  },
);

export const TenantMembershipModel = model<TenantMembership>(
  "TenantMembership",
  tenantMembershipSchema,
);
