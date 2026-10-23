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

  /*
   * The output matches the expected JSON structure.
   * This is not a factual verification.
   */
  "STRUCTURE_VALID",
  "STRUCTURE_INVALID",

  /*
   * Deterministic task-specific checks passed or failed.
   */
  "RULES_VALID",
  "RULES_INVALID",

  /*
   * Relevant evidence references were verified.
   * This becomes more important for proposal extraction.
   */
  "EVIDENCE_VALID",
  "EVIDENCE_INVALID",

  /*
   * Human review remains required for consequential results.
   */
  "HUMAN_REVIEW_REQUIRED",
  "HUMAN_CONFIRMED",
  "REJECTED"
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

export const VENDOR_STATUSES = [
  "ACTIVE",
  "INACTIVE",
  "UNDER_REVIEW",
  "BLOCKED",
] as const;
export const RFP_VENDOR_STATUSES = [
  "SHORTLISTED",
  "PENDING_APPROVAL",
  "APPROVED_TO_INVITE",
  "INVITED",
  "DECLINED",
  "RESPONDED",
  "DISQUALIFIED",
  "AWARDED",
  "NOT_SELECTED",
] as const;
export const PROPOSAL_STATUSES = [
  "UPLOADED",
  "QUEUED",
  "PROCESSING",
  "NEEDS_REVIEW",
  "VALIDATED",
  "FAILED",
  "REJECTED",
] as const;
export const EVALUATION_STATUSES = [
  "DRAFT",
  "IN_PROGRESS",
  "COMPLETED",
  "APPROVED",
] as const;
export const RECOMMENDATION_STATUSES = [
  "DRAFT",
  "READY_FOR_REVIEW",
  "APPROVED",
  "REJECTED",
] as const;
export const ACTIVITY_TYPES = [
  "RFP_CREATED",
  "REQUIREMENTS_ANALYZED",
  "REQUIREMENTS_UPDATED",
  "RFP_APPROVED",
  "VENDOR_SHORTLISTED",
  "INVITATION_APPROVED",
  "INVITATION_SENT",
  "PROPOSAL_UPLOADED",
  "PROPOSAL_PROCESSED",
  "EVALUATION_COMPLETED",
  "RECOMMENDATION_CREATED",
  "RFP_AWARDED",
  "SYSTEM_EVENT",
] as const;

export const AGENT_JOB_TYPES = [
  "REQUIREMENT_ANALYSIS"
] as const;

export type AgentJobType =
  (typeof AGENT_JOB_TYPES)[number];

export const AGENT_JOB_STATUSES = [
  "QUEUED",
  "CLAIMED",
  "RUNNING",
  "RETRY_WAIT",
  "SUCCEEDED",
  "FAILED",
  "DEAD_LETTER",
  "CANCELLED"
] as const;

export type AgentJobStatus = (typeof AGENT_JOB_STATUSES)[number];
