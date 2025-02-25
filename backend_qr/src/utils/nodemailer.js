import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL, 
    pass: process.env.USER_PASSWORD, 
  },
});

// Send confirmation email to the customer
export const sendEmailToCustomer = async (customerEmail, customerName) => {
  const subject = "Thank you for reaching out!";
  const text = `Dear ${customerName},\n\nThank you for contacting us. We have received your message and will get back to you shortly.\n\nBest regards,\nThe Team`;

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: customerEmail,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info; 
  } catch (error) {
    throw new Error("Failed to send email to customer: " + error.message);
  }
};

// Send email to the owner with customer details
export const sendEmailToOwner = async (
  customerName,
  customerEmail,
  customerMessage
) => {
  const subject = "New Contact Message from a Customer";
  const text = `You have received a new contact message from a customer:\n\nName: ${customerName}\nEmail: ${customerEmail}\nMessage: ${customerMessage}\n\nPlease respond to the customer as soon as possible.`;

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: process.env.USER_EMAIL,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw new Error("Failed to send email to owner: " + error.message);
  }
};
