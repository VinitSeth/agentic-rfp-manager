import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export function validateBody<T>(schema: ZodType<T>) {
  return function validationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "Request body validation failed",
        errors: result.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
          code: issue.code,
        })),
      });

      return;
    }

    req.body = result.data;
    next();
  };
}
