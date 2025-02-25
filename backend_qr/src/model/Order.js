import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    tableNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    items: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        }
      },
    ],
    orderStatus: {
      type: String,
      enum: ["pending", "preparing", "completed", "delivered", "cancelled"],
      default: "pending",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
