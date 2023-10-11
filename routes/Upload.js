import express from "express";
const router = express.Router();

import multer from "multer";

import { addImage, getImage } from "../api/s3.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

//TODO: make checkAdmin
router.post("/", upload.single("image"), addImage);
router.get("/:key", getImage);

export default router;
