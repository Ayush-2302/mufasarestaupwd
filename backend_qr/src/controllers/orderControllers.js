import OrderModel from "../model/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { tableNumber } = req.params;
    const { items, totalAmount, paymentStatus } = req.body;
    const order = new OrderModel({
      tableNumber,
      items,
      totalAmount,
      paymentStatus,
    });
    await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({}).populate("items._id").sort({createAt: -1});

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await OrderModel.findById(orderId).populate("items._id");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      { orderStatus, paymentStatus },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order",
      error: error.message,
    });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await OrderModel.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: error.message,
    });
  }
};
