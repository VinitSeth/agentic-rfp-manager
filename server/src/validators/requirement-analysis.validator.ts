import { z } from "zod";

import {
  REQUIREMENT_PRIORITIES
} from "../models/constants.js";

export const requirementItemSchema = z
  .object({
    key: z
      .string()
      .trim()
      .min(1)
      .max(100),

    description: z
      .string()
      .trim()
      .min(3)
      .max(2000),

    priority: z.enum(
      REQUIREMENT_PRIORITIES
    ),

    source: z.literal("AI_PROPOSED")
  })
  .strict();

export const requirementAnalysisOutputSchema = z
  .object({
    summary: z
      .string()
      .trim()
      .min(10)
      .max(5000),

    technical: z
      .array(requirementItemSchema)
      .max(100),

    commercial: z
      .array(requirementItemSchema)
      .max(100),

    mandatory: z
      .array(
        requirementItemSchema.extend({
          priority: z.literal("MUST")
        })
      )
      .max(100),

    assumptions: z
      .array(
        z
          .string()
          .trim()
          .min(3)
          .max(1000)
      )
      .max(50),

    openQuestions: z
      .array(
        z
          .string()
          .trim()
          .min(3)
          .max(1000)
      )
      .max(50)
  })
  .strict();

export type RequirementAnalysisOutput =
  z.infer<
    typeof requirementAnalysisOutputSchema
  >;