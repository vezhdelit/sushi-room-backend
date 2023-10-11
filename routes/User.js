import express from "express";
const router = express.Router();

import { registerValidation, loginValidation } from "../validations/auth.js";
import {
  register,
  login,
  profile,
  remove,
  update,
  addFavourite,
  removeFavourite,
} from "../controllers/UserController.js";
import checkAuth from "../middleware/checkAuth.js";
import handleValidationErrors from "../middleware/handleValidationErrors.js";

router.post("/login", loginValidation, handleValidationErrors, login);
router.post("/register", registerValidation, handleValidationErrors, register);
router.get("/profile", checkAuth, profile);
router.delete("/", checkAuth, remove);
router.patch(
  "/",
  registerValidation,
  handleValidationErrors,
  checkAuth,
  update
);

router.patch("/addFavourite", checkAuth, addFavourite);
router.patch("/removeFavourite", checkAuth, removeFavourite);

export default router;
