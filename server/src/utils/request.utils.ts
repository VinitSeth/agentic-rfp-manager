import type {
  Request
} from "express";

export function getRouteParameter(
  req: Request,
  parameterName: string
): string | null {
  const value = req.params[parameterName];

  if (
    typeof value !== "string" ||
    value.trim().length === 0
  ) {
    return null;
  }

  return value;
}