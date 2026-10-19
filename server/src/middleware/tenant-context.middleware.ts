import type {
  NextFunction,
  Request,
  Response
} from "express";

import {
  TenantModel
} from "../models/tenant.model.js";

import {
  TenantMembershipModel
} from "../models/tenant-membership.model.js";

export async function resolveTenantContext(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId =
      req.auth?.userId;

    if (!userId) {
      res.status(401).json({
        message:
          "Authentication is required"
      });

      return;
    }

    const requestedTenantHeader =
      req.headers["x-active-tenant"];

    const requestedTenantSlug =
      Array.isArray(requestedTenantHeader)
        ? requestedTenantHeader[0]
        : requestedTenantHeader;

    if (
      !requestedTenantSlug ||
      typeof requestedTenantSlug !== "string"
    ) {
      res.status(400).json({
        message:
          "X-Active-Tenant header is required"
      });

      return;
    }

    const tenant =
      await TenantModel.findOne({
        slug:
          requestedTenantSlug
            .trim()
            .toLowerCase(),

        status:
          "ACTIVE"
      }).lean();

    if (!tenant) {
      res.status(404).json({
        message:
          "Active tenant was not found"
      });

      return;
    }

    const membership =
      await TenantMembershipModel.findOne({
        tenantId:
          tenant._id,

        userId,

        status:
          "ACTIVE"
      }).lean();

    if (!membership) {
      res.status(403).json({
        message:
          "Access to this tenant is not permitted"
      });

      return;
    }

    req.tenant = {
      id:
        tenant._id.toString(),

      userId,

      role:
        membership.role,

      permissions:
        membership.permissions
    };

    next();
  } catch (error) {
    next(error);
  }
}