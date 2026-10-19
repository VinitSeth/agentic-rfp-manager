import type { RfpStatus } from "../models/constants.js";

const allowedTransitions: Record<
  string,
  readonly RfpStatus[]
> = {
  DRAFT: [
    "ANALYZING_REQUIREMENTS",
    "CANCELLED"
  ],
  ANALYZING_REQUIREMENTS: [
    "REQUIREMENTS_REVIEW",
    "DRAFT",
    "CANCELLED"
  ],
  REQUIREMENTS_REVIEW: [
    "DRAFT",
    "PENDING_RFP_APPROVAL",
    "CANCELLED"
  ]
};

export function assertRfpTransitionAllowed(
  currentStatus: RfpStatus,
  requestedStatus: RfpStatus
): void {
  const allowed =
    allowedTransitions[currentStatus] ?? [];

  if (!allowed.includes(requestedStatus)) {
    throw new Error(
      `Invalid RFP transition: ${currentStatus} -> ${requestedStatus}`
    );
  }
}