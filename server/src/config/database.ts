import mongoose from "mongoose";

export async function connectDatabase(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured");
  }

  mongoose.set("autoIndex", process.env.MONGODB_AUTO_INDEX !== "false");

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10_000,
  });

  console.log(
    `[database] Connected to MongoDB database: ${mongoose.connection.name}`,
  );
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}
