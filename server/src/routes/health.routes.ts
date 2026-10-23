import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

export default healthRouter;
