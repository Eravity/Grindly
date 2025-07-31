import express from "express";
import type { Request, Response } from "express";
import connectDB from "./database/mongodb.js";
import { PORT } from "./config/env.js";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import taskRouter from "./routes/task.js";
import rewardRouter from "./routes/reward.js";
import eventLogRouter from "./routes/eventLog.js";
import errorMiddleware from "./middleware/error.middleware.js";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(arcjetMiddleware);

// server.use("/api/v1/auth", authRouter);
server.use("/api/v1/users", userRouter);
server.use("/api/v1/auth", authRouter);
server.use("/api/v1/tasks", taskRouter);
server.use("/api/v1/rewards", rewardRouter);
server.use("/api/v1/events", eventLogRouter);

server.use(errorMiddleware)

server.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Grindly API!");
});

const port = PORT || 3000;

server.listen(port, async () => {
  console.log(`Grindly API is running on http://localhost:${port}`);
  try {
    await connectDB();
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
});