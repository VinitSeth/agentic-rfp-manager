import cors from "cors";
import express from "express";
import apiRouter from "./routes/index.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL ?? "http://localhost:5173",
    credentials: true,
  }),
);

app.use(
  express.json({
    limit: "1mb",
  }),
);

app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Agentic RFP Manager API is running",
  });
});

app.use("/api", apiRouter);

/*
 * Must be after all valid routes.
 */
app.use(notFoundHandler);

/*
 * Must be last.
 * Express identifies error middleware by its four parameters.
 */
app.use(errorHandler);

export default app;