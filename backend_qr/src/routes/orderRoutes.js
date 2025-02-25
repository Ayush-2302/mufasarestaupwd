import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderControllers.js";

const router = express.Router();

router.post("/orders/:tableNumber", createOrder);

// Get all orders
router.get("/orders", getAllOrders);

// Get a single order by ID
router.get("/orders/:orderId", getOrderById);

// Update an order
router.put("/orders/:orderId", updateOrder);

// Delete an order
router.delete("/orders/:orderId", deleteOrder);

export default router;
