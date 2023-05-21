import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
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
        default: '',
    },
    compounds: {
        type: String,
        required: true,
    },

    category: {
        type: Array,
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