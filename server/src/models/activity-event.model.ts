import { Schema, Types, model } from "mongoose";
import { ACTIVITY_TYPES } from "./constants.js";
export interface ActivityEvent {
  tenantId: Types.ObjectId;
  actorId?: Types.ObjectId;
  type: (typeof ACTIVITY_TYPES)[number];
  entityType:
    | "RFP"
    | "VENDOR"
    | "PROPOSAL"
    | "EVALUATION"
    | "RECOMMENDATION"
    | "SYSTEM";
  entityId?: Types.ObjectId;
  rfpId?: Types.ObjectId;
  message: string;
  metadata?: Record<string, unknown>;
  readBy: Types.ObjectId[];
}
const schema = new Schema<ActivityEvent>(
  {
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      immutable: true,
    },
    actorId: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ACTIVITY_TYPES, required: true },
    entityType: {
      type: String,
      enum: [
        "RFP",
        "VENDOR",
        "PROPOSAL",
        "EVALUATION",
        "RECOMMENDATION",
        "SYSTEM",
      ],
      required: true,
    },
    entityId: { type: Schema.Types.ObjectId },
    rfpId: { type: Schema.Types.ObjectId, ref: "Rfp" },
    message: { type: String, required: true, trim: true, maxlength: 1000 },
    metadata: { type: Schema.Types.Mixed },
    readBy: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
  },
  { timestamps: true, collection: "activityEvents", strict: "throw" },
);
schema.index(
  { tenantId: 1, createdAt: -1 },
  { name: "ix_activity_tenant_created" },
);
schema.index(
  { tenantId: 1, rfpId: 1, createdAt: -1 },
  { name: "ix_activity_rfp_created" },
);
export const ActivityEventModel = model<ActivityEvent>("ActivityEvent", schema);
