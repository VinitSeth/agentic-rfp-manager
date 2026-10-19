import type {
  NextFunction,
  Request,
  Response
} from "express";

const ROLE_PERMISSIONS: Record<string, string[]> = {
  TENANT_ADMIN: ["*"],

  PROCUREMENT_MANAGER: [
    "rfp:create",
    "rfp:read",
    "rfp:update",
    "rfp:analyze",
    "rfp:review"
  ],

  REQUESTER: [
    "rfp:create",
    "rfp:read",
    "rfp:update",
    "rfp:analyze",
    "rfp:review"
  ],

  EVALUATOR: [
    "rfp:read"
  ],

  APPROVER: [
    "rfp:read",
    "rfp:approve"
  ],

  AUDITOR: [
    "rfp:read",
    "agent-run:read"
  ]
};

export function requirePermission(
  permission: string
) {
  return function permissionMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const tenantContext = req.tenant;

    if (!tenantContext) {
      res.status(401).json({
        message: "Tenant context required"
      });
      return;
    }

    const rolePermissions =
      ROLE_PERMISSIONS[tenantContext.role] ?? [];

    const explicitlyGranted =
      tenantContext.permissions.includes(permission);

    const roleGranted =
      rolePermissions.includes("*") ||
      rolePermissions.includes(permission);

    if (!explicitlyGranted && !roleGranted) {
      res.status(403).json({
        message: "Operation is not permitted"
      });
      return;
    }

    next();
  };
}