import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartPage from "../pages/CartPage";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart);
  const [showCart, setShowCart] = useState(false);

  return (
    <nav className="bg-teal-800 z-50 sticky top-0 p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Mufasa</Link>
        <div className="flex text-white items-center">
          <Link to="/menu/1" className=" font-semibold px-4 py-2">
            Menu
          </Link>
          <Link to="/order" className=" font-semibold px-4 py-2">
            Order
          </Link>
          <Link to="/cart" className=" font-semibold px-4 py-2">
            Cart ({cartItems.length})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
