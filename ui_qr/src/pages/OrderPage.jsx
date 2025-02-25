import React, { useEffect, useState } from "react";
import { getAllOrder } from "../apiService/orderService";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getAllOrder();
        setOrder(response.orders);
      } catch (error) {
        setError("Error fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  // Return loading state
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // Return error state
  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  // Return no orders state
  if (!order.length) {
    return <div className="text-center py-8">No Orders Found</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mt-8">
        <h2 className="text-3xl font-semibold text-gray-800">Order Details</h2>

        {/* Order Items */}
        <div className="mt-8 space-y-6">
          {order.map((item) => (
            <div
              key={item._id} // Use unique ID instead of index for better performance
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              {/* Order Information */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  Order ID:
                </h3>
                <p className="text-lg text-gray-600">{item._id}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  Order Status:
                </h3>
                <p className="text-lg text-gray-600">{item.orderStatus}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  Payment Status:
                </h3>
                <p className="text-lg text-gray-600">{item.paymentStatus}</p>
              </div>
              <div className=" text-white flex justify-end ">
                <Link
                  className="bg-teal-700 rounded-md p-3"
                  to={`/order/${item._id}`}
                >
                  view Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
