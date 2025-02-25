import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },

    category: {
      type: String,
      enum: ["starter", "main", "dessert", "beverage"],
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "unavailable", "coming soon"],
      required: true,
    },
    noOfServing: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MenuModel = mongoose.model("Menu", menuSchema);

export default MenuModel;
