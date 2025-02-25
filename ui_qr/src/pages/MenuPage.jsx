import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { cartAdded } from "../redux/cartSlice";
import { toast } from "react-toastify";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/menu`
        );
        setMenuItems(response.data);
      } catch (err) {
        setError("Failed to fetch menu items");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleAddToCart = (item) => {
    dispatch(cartAdded(item));
    toast.success("Item added to cart");
  };

  if (loading)
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 text-xl">{error}</div>;

  return (
    <div className="">
      <div
        className="relative w-full h-64 bg-cover bg-center  mb-12"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1535850452425-140ee4a8dbae?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Savor the Flavors</h1>
          <p className="text-lg mb-6">
            Discover our mouthwatering menu crafted just for you!
          </p>
          <a
            href="#menu"
            className="px-6 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200"
          >
            Explore Our Menu
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 mb-10 lg:grid-cols-3 gap-8 px-6">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform  p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-center mb-2">
              {item.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{item.description}</p>
            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-2 items-center">
                <p className="font-semibold bg-red-400 px-4 opacity-90 py-1  text-xs w-fit rounded-md text-white">
                  {item.category}
                </p>
                <p className="text-md font-semibold text-green-600">
                  {item.status}
                </p>
              </div>
              <p className="text-xl font-semibold text-gray-800">
                ${item.price}
              </p>
            </div>
            <button
              className="mt-4 px-4 py-1 float-right bg-teal-700 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
