import type { RequirementAnalysisOutput } from "../validators/requirement-analysis.validator.js";

export async function mockAnalyzeRequirements(
  requirementBrief: string,
): Promise<RequirementAnalysisOutput> {
  return {
    summary:
      "Procure and implement network equipment for multiple office locations with post-implementation support.",

    technical: [
      {
        key: "network-equipment",
        description:
          "Provide suitable network switches and routers for the specified office locations.",
        priority: "MUST",
        source: "AI_PROPOSED",
      },
      {
        key: "installation",
        description:
          "Install, configure and validate the supplied network equipment.",
        priority: "MUST",
        source: "AI_PROPOSED",
      },
    ],

    commercial: [
      {
        key: "budget-compliance",
        description:
          "The proposal should remain within the approved procurement budget.",
        priority: "MUST",
        source: "AI_PROPOSED",
      },
    ],

    mandatory: [
      {
        key: "support",
        description:
          "Include post-implementation support and incident response coverage.",
        priority: "MUST",
        source: "AI_PROPOSED",
      },
    ],

    assumptions: [
      "Existing office cabling is assumed to be outside the supply scope.",
      `The submitted requirement brief was: ${requirementBrief.substring(
        0,
        200,
      )}`,
    ],

    openQuestions: [
      "How many switches and routers are required at each location?",
      "Are specific manufacturers or technical standards mandatory?",
      "What implementation completion date is required?",
      "What support response times are expected?",
    ],
  };
}
