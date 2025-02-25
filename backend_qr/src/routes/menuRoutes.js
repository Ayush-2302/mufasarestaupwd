import express from "express";
import {
  createMenuItem,
  getMenuItems,
} from "../controllers/menuControllers.js";

const router = express.Router();

router.post("/menu", createMenuItem);

router.get("/menu", getMenuItems);

export default router;
