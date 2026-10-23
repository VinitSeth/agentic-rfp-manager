import {
  requirementAnalysisOutputSchema,
  type RequirementAnalysisOutput,
} from "../validators/requirement-analysis.validator.js";
import { mockAnalyzeRequirements } from "../adapters/mock-requirement-analysis.adapter.js";

export interface RequirementAnalysisAgentInput {
  requirementBrief: string;
}

export interface RequirementAnalysisAgentResult {
  status: "SUCCEEDED" | "VALIDATION_FAILED";

  output?: RequirementAnalysisOutput;

  findings: Array<{
    code: string;
    severity: "INFO" | "WARNING" | "ERROR" | "BLOCKING";
    message: string;
  }>;
}

export async function executeRequirementAnalysisAgent(
  input: RequirementAnalysisAgentInput,
): Promise<RequirementAnalysisAgentResult> {
  const rawOutput = await mockAnalyzeRequirements(input.requirementBrief);

  const validationResult = requirementAnalysisOutputSchema.safeParse(rawOutput);

  if (!validationResult.success) {
    return {
      status: "VALIDATION_FAILED",
      findings: validationResult.error.issues.map((issue) => ({
        code: "REQUIREMENT_OUTPUT_SCHEMA_INVALID",
        severity: "BLOCKING",
        message: `${issue.path.join(".")}: ${issue.message}`,
      })),
    };
  }

  return {
    status: "SUCCEEDED",
    output: validationResult.data,
    findings: [],
  };
}
