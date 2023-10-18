import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoute from "./routes/User.js";
import itemRoute from "./routes/Item.js";
import uploadRoute from "./routes/Upload.js";
import adRoute from "./routes/Ad.js";

import swaggerDocs from "./utils/swagger.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database reached successfuly"))
  .catch((err) => console.log("Error. Can't reach database", err));

///////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("Server is up.");
});

app.use("/auth", userRoute);
app.use("/items", itemRoute);
app.use("/upload", uploadRoute);
app.use("/ads", adRoute);

////////////////////////////////////////////

app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    return console.log("Error. Can't start server", err);
  }
  console.log("Server started successfuly");
  swaggerDocs(app, process.env.PORT || 5000);
});
