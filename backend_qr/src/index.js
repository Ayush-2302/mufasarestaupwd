import app from "./app.js";
import dotenv from "dotenv";
import connectToDb from "./config/db.js";
dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
  connectToDb();
  console.log(`server is running on port ${port}`);
});
