import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import OrderDetailsPage from "./pages/OrderDetailsPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pause
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order/:orderId" element={<OrderDetailsPage />} />
        <Route path="/menu/:tableId" element={<MenuPage />} />
        <Route path="/cart/:tableId" element={<CartPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
