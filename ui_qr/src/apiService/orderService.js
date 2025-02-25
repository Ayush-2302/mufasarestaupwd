import httpService from "./httpService";
import { toast } from "react-toastify";

export const placeOrder = async (data) => {
  try {
    const response = await httpService.post("/orders/1", data);
    toast.success("Order placed successfully");
    return response.data;
  } catch (error) {
    toast.error("Error placing order");
    console.error(error);
  }
};

export const getAllOrder = async () => {
  try {
    const response = await httpService.get(`/orders`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching order");
    console.error(error);
  }
};
export const getOrder = async (orderId) => {
  try {
    const response = await httpService.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching order");
    console.error(error);
  }
};
export const contactApi = async (data) => {
  try {
    const response = await httpService.post(`/contact`, data);
    toast.success("Message sent successfully");
    return response.data;
  } catch (error) {
    toast.error("Error sending message");
    console.error(error);
  }
};
