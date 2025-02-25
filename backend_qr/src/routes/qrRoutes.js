import express from "express";
import { createQrScanner, submitContactForm } from "../controllers/qrControllers.js";

const router = express.Router();

router.get("/qr/:tableId", createQrScanner);

router.post("/contact", submitContactForm);

export default router;
