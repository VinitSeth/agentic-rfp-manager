import type {
  NextFunction,
  Request,
  Response
} from "express";

import mongoose from "mongoose";

interface MongoDuplicateKeyError extends Error {
  code: number;
  keyPattern?: Record<string, number>;
  keyValue?: Record<string, unknown>;
}

function isMongoDuplicateKeyError(
  error: unknown
): error is MongoDuplicateKeyError {
  return (
    error instanceof Error &&
    "code" in error &&
    error.code === 11000
  );
}

export function notFoundHandler(
  req: Request,
  res: Response
): void {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
}

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (isMongoDuplicateKeyError(error)) {
    res.status(409).json({
      message:
        "A record with the same unique value already exists",

      fields:
        Object.keys(error.keyPattern ?? {}),

      values:
        error.keyValue ?? {}
    });

    return;
  }

  if (
    error instanceof mongoose.Error.ValidationError
  ) {
    res.status(400).json({
      message:
        "Database document validation failed",

      errors:
        Object.values(error.errors).map(
          (validationError) => ({
            field:
              validationError.path,

            message:
              validationError.message
          })
        )
    });

    return;
  }

  if (
    error instanceof mongoose.Error.CastError
  ) {
    res.status(400).json({
      message:
        "A supplied identifier or value has an invalid format",

      field:
        error.path
    });

    return;
  }

  console.error("[request-error]", {
    method: req.method,
    path: req.originalUrl,

    message:
      error instanceof Error
        ? error.message
        : "Unknown error"
  });

  res.status(500).json({
    message:
      "The request could not be completed"
  });
}