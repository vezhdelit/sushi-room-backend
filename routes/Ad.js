import express from "express";
const router = express.Router();

import { adCreateValidation } from "../validations/ad.js";
import { createAd, getAllAds } from "../controllers/AdController.js";

import handleValidationErrors from "../middleware/handleValidationErrors.js";

router.post("/", adCreateValidation, handleValidationErrors, createAd);
router.get("/", getAllAds);

export default router;
