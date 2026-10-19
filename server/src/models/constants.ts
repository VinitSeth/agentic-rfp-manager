export const TENANT_STATUSES = ["ACTIVE", "SUSPENDED", "INACTIVE"] as const;
export type TenantStatus = (typeof TENANT_STATUSES)[number];
export const USER_STATUSES = ["ACTIVE", "INACTIVE", "LOCKED"] as const;
export type UserStatus = (typeof USER_STATUSES)[number];
export const MEMBERSHIP_STATUSES = ["ACTIVE", "INACTIVE", "REVOKED"] as const;
export type MembershipStatus = (typeof MEMBERSHIP_STATUSES)[number];

export const TENANT_ROLES = [
  "TENANT_ADMIN",
  "PROCUREMENT_MANAGER",
  "REQUESTER",
  "EVALUATOR",
  "APPROVER",
  "AUDITOR",
] as const;

export type TenantRole = (typeof TENANT_ROLES)[number];

export const RFP_STATUSES = [
  "DRAFT",
  "ANALYZING_REQUIREMENTS",
  "REQUIREMENTS_REVIEW",
  "PENDING_RFP_APPROVAL",
  "APPROVED",
  "VENDOR_SELECTION",
  "INVITATIONS_PENDING_APPROVAL",
  "COLLECTING_PROPOSALS",
  "EVALUATION_IN_PROGRESS",
  "RECOMMENDATION_REVIEW",
  "AWARDED",
  "CLOSED",
  "CANCELLED",
] as const;

export type RfpStatus = (typeof RFP_STATUSES)[number];

export const AGENT_RUN_STATUSES = [
  "QUEUED",
  "RUNNING",
  "OUTPUT_RECEIVED",
  "REPAIR_PENDING",
  "REVIEW_REQUIRED",
  "SUCCEEDED",
  "FAILED",
  "CANCELLED",
] as const;

export type AgentRunStatus = (typeof AGENT_RUN_STATUSES)[number];

export const VERIFICATION_STATUSES = [
  "NOT_STARTED",
  "SCHEMA_VALID",
  "SCHEMA_FAILED",
  "RULES_VALID",
  "RULES_FAILED",
  "EVIDENCE_VALID",
  "EVIDENCE_FAILED",
  "HUMAN_REVIEW_REQUIRED",
  "VERIFIED",
] as const;

export type VerificationStatus = (typeof VERIFICATION_STATUSES)[number];

export const REQUIREMENT_PRIORITIES = ["MUST", "SHOULD", "COULD"] as const;

export type RequirementPriority = (typeof REQUIREMENT_PRIORITIES)[number];

export const REQUIREMENT_SOURCES = [
  "USER",
  "AI_PROPOSED",
  "USER_CONFIRMED",
] as const;

export type RequirementSource = (typeof REQUIREMENT_SOURCES)[number];
