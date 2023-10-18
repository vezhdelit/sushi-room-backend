import mongoose from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    Item:
 *      type: object
 *      required:
 *        - imageUrl
 *        - title
 *        - price
 *        - quantity
 *        - weight
 *        - compounds
 *        - category
 *      properties:
 *        imageUrl:
 *          type: string
 *          default: unsplash/images/filadelfia.jpg
 *        title:
 *          type: string
 *          default: Філадельфія
 *        price:
 *          type: number
 *          default: 300
 *        quantity:
 *          type: number
 *          default: 8
 *        weight:
 *          type: number
 *          default: 200
 *        compounds:
 *          type: string
 *          default: Лосось, рис
 *        category:
 *          type: string
 *          default: Роли
 */

const ItemSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },
    compounds: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Item", ItemSchema);
