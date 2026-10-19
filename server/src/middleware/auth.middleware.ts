import type {
  NextFunction,
  Request,
  Response
} from "express";

import jwt, {
  type JwtPayload
} from "jsonwebtoken";

import { UserModel } from "../models/user.model.js";

interface ApplicationJwtPayload extends JwtPayload {
  sub: string;
}

export async function authenticateJwt(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authorizationHeader =
      req.headers.authorization;

    if (
      !authorizationHeader ||
      !authorizationHeader.startsWith("Bearer ")
    ) {
      res.status(401).json({
        message: "Bearer token is required"
      });

      return;
    }

    const token =
      authorizationHeader.substring("Bearer ".length);

    const jwtSecret = process.env.JWT_SECRET;
    const jwtIssuer = process.env.JWT_ISSUER;
    const jwtAudience = process.env.JWT_AUDIENCE;

    if (
      !jwtSecret ||
      !jwtIssuer ||
      !jwtAudience
    ) {
      throw new Error(
        "JWT configuration is incomplete"
      );
    }

    const decoded = jwt.verify(
      token,
      jwtSecret,
      {
        issuer: jwtIssuer,
        audience: jwtAudience
      }
    ) as ApplicationJwtPayload;

    if (!decoded.sub) {
      res.status(401).json({
        message: "Token subject is missing"
      });

      return;
    }

    const user = await UserModel.findOne({
      identityProviderId: decoded.sub,
      status: "ACTIVE"
    }).lean();

    if (!user) {
      res.status(401).json({
        message: "Authenticated user was not found"
      });

      return;
    }

    req.auth = {
      userId: user._id.toString(),
      identityProviderId: decoded.sub
    };

    next();
  } catch (error) {
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError
    ) {
      res.status(401).json({
        message: "JWT is invalid or expired"
      });

      return;
    }

    next(error);
  }
}