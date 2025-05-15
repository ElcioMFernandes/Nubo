import express from "express";
import {
  container_controller,
  containers_controller,
  logs_controller,
} from "../controllers/container";
import { log_middleware } from "../middlewares/log";

export const container_router = express.Router();

container_router.get("/", log_middleware, async (req, res) => {
  const view = req.query.view as string;

  res.json(await containers_controller(view));
});

container_router.get("/:id", log_middleware, async (req, res) => {
  const { id } = req.params;
  const view = req.query.view as string;

  res.json(await container_controller(id, view));
});

container_router.get("/:id/logs", log_middleware, async (req, res) => {
  const { id } = req.params;

  const ret = await logs_controller(id);

  res.json(ret);
});
