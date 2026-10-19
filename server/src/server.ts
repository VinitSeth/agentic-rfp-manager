import "dotenv/config";
import { connectDatabase } from "./config/database.js";
import app from "./app.js";

const port = Number(process.env.PORT ?? 4000);

async function start(): Promise<void> {
  await connectDatabase();

  app.listen(port, () => {
    console.info(`[server] Listening on port ${port}`);
  });
}

start().catch((error: unknown) => {
  console.error("[server] Startup failed", error);
  process.exit(1);
});