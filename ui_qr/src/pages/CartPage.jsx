import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAdded, cartRemoved } from "../redux/cartSlice";
import { placeOrder } from "../apiService/orderService";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  const handleRemoveFromCart = (id) => {
    dispatch(cartRemoved(id));
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await placeOrder({ items: cartItems, totalAmount });
      if (response.success) {
        localStorage.clear();
        navigate("/order");
      }
      console.log(response);
    } catch (error) {}
  };

  return (
    <div className=" min-h-screen">
      <div
        className="relative w-full h-64 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1505935428862-770b6f24f629?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 "></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Your Cart is Waiting</h1>
          <p className="text-lg mb-6">
            Review your items before you complete your purchase!
          </p>
          <a
            href="#cart"
            className="px-6 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200"
          >
            Review Cart Items
          </a>
        </div>
      </div>
      <div className="p-6">
        {cartItems.length === 0 ? (
          <div className="text-center text-xl font-semibold">
            Your cart is empty!
          </div>
        ) : (
          <div className="space-y-6 ">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white flex rounded-lg gap-5 shadow-lg p-5"
              >
                <div className="img">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-lg font-semibold text-gray-800">
                    ${item.price}
                  </p>
                </div>
                <button
                  className="text-red-500"
                  onClick={() => handleRemoveFromCart(item._id)}
                >
                  Remove
                </button>{" "}
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 text-xl font-semibold">
          <p className="text-gray-800">Total: ${totalAmount.toFixed(2)}</p>
        </div>

        {cartItems.length > 0 && (
          <div className="mt-4 text-center">
            <button
              onClick={handlePlaceOrder}
              className="px-6 py-3 bg-teal-700 font-semibold hover:bg-teal-600 text-white rounded-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
