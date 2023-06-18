import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

import { registerValidation, loginValidation } from "./validations/auth.js";
import {
  register,
  login,
  profile,
  remove,
  update,
  addFavourite,
  removeFavourite,
} from "./controllers/UserController.js";

import { itemCreateValidation } from "./validations/item.js";
import {
  createItem,
  getAllItems,
  getOneItem,
  deleteItem,
  updateItem,
} from "./controllers/ItemController.js";

import { adCreateValidation } from "./validations/ad.js";
import { createAd, getAllAds } from "./controllers/AdController.js";

import handleValidationErrors from "./middleware/handleValidationErrors.js";
import checkAuth from "./middleware/checkAuth.js";

import { addImage, getImage } from "./api/s3.js";

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

////

app.post("/auth/login", loginValidation, handleValidationErrors, login);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  register
);
app.get("/auth/profile", checkAuth, profile);
app.delete("/auth", checkAuth, remove);
app.patch(
  "/auth",
  registerValidation,
  handleValidationErrors,
  checkAuth,
  update
);

app.patch("/auth/addFavourite", checkAuth, addFavourite);
app.patch("/auth/removeFavourite", checkAuth, removeFavourite);

////

app.post("/items", itemCreateValidation, handleValidationErrors, createItem);
app.get("/items", getAllItems);
app.get("/items/:id", getOneItem);
app.delete("/items/:id", deleteItem); //TODO: make checkAdmin
app.patch(
  "/items/:id",
  itemCreateValidation,
  handleValidationErrors,
  updateItem
);

////

app.post("/ads", adCreateValidation, handleValidationErrors, createAd);
app.get("/ads", getAllAds);

//////////////////////////////////////////////

app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    return console.log("Error. Can't start server", err);
  }
  console.log("Server started successfuly");
});
