import express from "express";
import { container, containers } from "../controllers/container";

export const router = express.Router();

router.get("/", async (req, res) => {
  const ret = await containers();

  res.json(ret);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const ret = await container(id);
});
