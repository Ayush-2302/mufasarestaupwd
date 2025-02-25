import { sendEmailToCustomer, sendEmailToOwner } from "../utils/nodemailer.js";
import QRCode from "qrcode";

export const createQrScanner = async (req, res) => {
  const tableId = req.params.tableId;
  const tableUrl = `${process.env.BASE_URL}/menu/${tableId}`;
  try {
    QRCode.toDataURL(tableUrl, (err, qrCodeUrl) => {
      if (err) {
        return res.status(500).json({
          message: "Error generating QR code",
        });
      } else {
        res.json({
          qrCodeUrl,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error generating QRCode", success: "false" });
  }
};

export const submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "All fields (name, email, message) are required" });
  }

  try {
    await sendEmailToCustomer(email, name);
    await sendEmailToOwner(name, email, message);
    return res.status(201).json({
      message: "Contact message received and email sent successfully!",
      contact: { name, email, message },
    });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
};
