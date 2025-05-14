import dotenv from "dotenv";
import express from "express";
import { env } from "./configs/env";
import { router } from "./routes/containers";

dotenv.config();

const app = express();

app.use("/containers", router);

if (env.SOCKET_PATH) {
  app.listen(env.EXPRESS_PORT, () => {
    console.log(`Server is running on http://localhost:${env.EXPRESS_PORT}`);
  });
} else {
  console.error("SOCKET_PATH is not defined in the environment variables.");
}
