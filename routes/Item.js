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

/**
 * @openapi
 * /items:
 *  get:
 *     tags:
 *     - Items
 *     summary: Get all items
 *     description: Returns an array of items
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Unable to get items
 *
 */

router.get("/", getAllItems);

/**
 * @openapi
 * /items:
 *  post:
 *     tags:
 *     - Items
 *     summary: Create new item
 *     description: Returns an item
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Unable to get item
 *
 */

router.post("/", itemCreateValidation, handleValidationErrors, createItem);

/**
 * @openapi
 * /items:
 *  post:
 *     tags:
 *     - Items
 *     summary: Create new item
 *     description: Returns an item
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Unable to get item
 *
 */
router.get("/:id", getOneItem);
router.delete("/:id", deleteItem); //TODO: make checkAdmin
router.patch("/:id", itemCreateValidation, handleValidationErrors, updateItem);

export default router;
