import { z } from "zod";
import { REQUIREMENT_PRIORITIES } from "../models/constants.js";

export const createRfpSchema = z
  .object({
    rfpNumber: z
      .string()
      .trim()
      .min(3)
      .max(50)
      .transform((value) => value.toUpperCase()),

    title: z.string().trim().min(3).max(200),

    category: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .transform((value) => value.toUpperCase()),

    requirementBrief: z.string().trim().min(20).max(20_000),

    budget: z
      .object({
        amount: z.number().finite().nonnegative(),

        currency: z
          .string()
          .trim()
          .length(3)
          .transform((value) => value.toUpperCase()),
      })
      .strict()
      .optional(),
  })
  .strict();

export type CreateRfpInput = z.infer<typeof createRfpSchema>;

const reviewedRequirementItemSchema = z
  .object({
    key: z.string().trim().min(1).max(100),

    description: z.string().trim().min(3).max(2000),

    priority: z.enum(REQUIREMENT_PRIORITIES),
  })
  .strict();

const reviewedRequirementsSchema = z
  .object({
    summary: z.string().trim().min(10).max(5000),

    technical: z.array(reviewedRequirementItemSchema).max(100),

    commercial: z.array(reviewedRequirementItemSchema).max(100),

    mandatory: z
      .array(
        reviewedRequirementItemSchema.extend({
          priority: z.literal("MUST"),
        }),
      )
      .max(100),

    assumptions: z.array(z.string().trim().min(3).max(1000)).max(50),

    openQuestions: z.array(z.string().trim().min(3).max(1000)).max(50),
  })
  .strict();

export const confirmRequirementsSchema = z
  .object({
    expectedVersion: z.number().int().positive(),

    requirements: reviewedRequirementsSchema,
  })
  .strict();

export type ConfirmRequirementsInput = z.infer<
  typeof confirmRequirementsSchema
>;
