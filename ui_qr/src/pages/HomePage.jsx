import React, { useState } from "react";
import QRCodeDisplay from "../components/QRCodeDisplay";
import { contactApi } from "../apiService/orderService";

const HomePage = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleContact = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await contactApi(contactData);
      setContactData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const tableId = 1;
  return (
    <div>
      <div className="bg-gray-50">
        <section
          id="home"
          className="bg-cover bg-center h-96 relative"
          style={{
            backgroundImage: "url(./banner.jpg)",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-5xl font-bold">Welcome to Our Restaurant</h2>
            <p className="mt-4 text-xl">Delicious meals made with love</p>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-16 bg-gray-100">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-700">About Us</h2>
            <p className="mt-4 text-lg text-gray-600">
              We are a family-owned restaurant that offers a wide range of
              delicious dishes made with fresh, high-quality ingredients. Our
              mission is to provide an unforgettable dining experience for you
              and your loved ones.
            </p>
          </div>
        </section>

        {/* QR Code Section */}
        <section id="scanner" className="py-16 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-700">
              Scan to See Menu
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Scan the QR code below to view our full menu!
            </p>
            <div className="mt-8 flex justify-center w-full">
              <QRCodeDisplay tableId={tableId} />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-700">Contact Us</h2>
            <p className="mt-4 text-lg text-gray-600">
              Feel free to reach out to us for reservations or inquiries.
            </p>
            {error && <p className="text-red-600">{error}</p>}
            <form onSubmit={handleContact} className="mt-8 max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                value={contactData.name}
                onChange={onChange}
                className="w-full p-4 mb-4 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                value={contactData.email}
                onChange={onChange}
                className="w-full p-4 mb-4 border border-gray-300 rounded-lg"
              />
              <textarea
                placeholder="Your Message"
                name="message"
                value={contactData.message}
                onChange={onChange}
                className="w-full p-4 mb-4 border border-gray-300 rounded-lg"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-teal-700 text-white p-4 rounded-lg"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
