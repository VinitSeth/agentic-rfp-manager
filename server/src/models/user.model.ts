import { Schema, model } from "mongoose";
import { USER_STATUSES, type UserStatus } from "./constants.js";

export interface User {
  displayName: string;
  email?: string;
  identityProviderId?: string;
  status: UserStatus;
}

const userSchema = new Schema<User>(
  {
    displayName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    identityProviderId: {
      type: String,
      trim: true,
      maxlength: 256,
    },
    status: {
      type: String,
      enum: USER_STATUSES,
      required: true,
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
    collection: "users",
    strict: "throw",
  },
);

userSchema.index(
  { identityProviderId: 1 },
  {
    unique: true,
    name: "uq_users_identity_provider_id",
    partialFilterExpression: {
      identityProviderId: {
        $type: "string",
      },
    },
  },
);

userSchema.index(
  { email: 1 },
  {
    name: "ix_users_email",
    partialFilterExpression: {
      email: {
        $type: "string",
      },
    },
  },
);

export const UserModel = model<User>("User", userSchema);
