import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrder } from "../apiService/orderService";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getOrder(orderId);
        setOrderDetails(response.order);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  console.log(orderDetails?.items[0]);

  // Loading state
  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mt-8">
        <h2 className="text-3xl font-semibold text-gray-800">Order Details</h2>

        {/* Render Order Information */}
        <div className="mt-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-700">Order ID:</h3>
              <p className="text-lg text-gray-600">{orderDetails._id}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Order Status:
              </h3>
              <p className="text-lg text-gray-600">
                {orderDetails.orderStatus}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Payment Status:
              </h3>
              <p className="text-lg text-gray-600">
                {orderDetails.paymentStatus}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Total Amount:
              </h3>
              <p className="text-lg text-gray-600">
                ${orderDetails.totalAmount}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-700">Items:</h3>
              <ul className="list-disc pl-6">
                {orderDetails?.items?.map((item, index) => (
                  <li key={index} className="text-lg text-gray-600">
                    {item?._id.name} - {item?.quantity} x ${item?._id.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
