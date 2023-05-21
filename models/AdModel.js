import mongoose from "mongoose";

const AdSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    }
);

export default mongoose.model("Ad", AdSchema);