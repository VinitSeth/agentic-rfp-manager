import type { TenantRole } from "../models/constants.js";

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
        identityProviderId: string;
      };

      tenant?: {
        id: string;
        userId: string;
        role: TenantRole;
        permissions: string[];
      };
    }
  }
}

export {};