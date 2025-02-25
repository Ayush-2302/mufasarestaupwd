import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const QRCodeDisplay = ({ tableId }) => {
  const [qrCodeUrl, setQRCodeUrl] = useState();
  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/qr/${tableId}`
        );
        setQRCodeUrl(response.data.qrCodeUrl);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQRCode();
  }, [tableId]);

  return (
    <div>
      {qrCodeUrl ? <img src={qrCodeUrl} alt="QR Code" /> : <p>loading...</p>}
      <p></p>
    </div>
  );
};

export default QRCodeDisplay;
