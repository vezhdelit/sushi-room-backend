import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

import { addImage, getImage } from "./api/s3.js";

import userRoute from "./routes/User.js";
import itemRoute from "./routes/Item.js";
import adRoute from "./routes/Ad.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database reached successfuly"))
  .catch((err) => console.log("Error. Can't reach database", err));

///////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("Server is up.");
});

//TODO: make checkAdmin
app.post("/upload", upload.single("image"), addImage);
app.get("/upload/:key", getImage);

//////////////////////////////////////////////

app.use("/auth", userRoute);
app.use("/items", itemRoute);
app.use("/ads", adRoute);

////////////////////////////////////////////

app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    return console.log("Error. Can't start server", err);
  }
  console.log("Server started successfuly");
});
