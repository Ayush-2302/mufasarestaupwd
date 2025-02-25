import express from "express";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import qrRoutes from "./routes/qrRoutes.js";

const app = express();
app.use(express.json());

app.use(cors());
app.use("/api", orderRoutes);
app.use("/api", menuRoutes);
app.use("/api", qrRoutes);

export default app;
