import { Router } from "express";
import healthRouter from "./health.routes.js";
import rfpRoutes from "./rfp.routes.js";

const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/rfps", rfpRoutes);

export default apiRouter;