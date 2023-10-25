import express from "express";
const router = express.Router();

import { itemCreateValidation } from "../validations/item.js";
import {
  createItem,
  getAllItems,
  getOneItem,
  deleteItem,
  updateItem,
} from "../controllers/ItemController.js";
import handleValidationErrors from "../middleware/handleValidationErrors.js";

router.get("/", getAllItems);
router.get("/:id", getOneItem);

router.post("/", itemCreateValidation, handleValidationErrors, createItem);
router.delete("/:id", deleteItem); //TODO: make checkAdmin
router.patch("/:id", itemCreateValidation, handleValidationErrors, updateItem);

export default router;
