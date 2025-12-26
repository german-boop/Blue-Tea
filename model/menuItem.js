import mongoose from "mongoose";
import CategoryModel from "./category";

const MenuItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
        },

        description: {
            type: String,
            trim: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        isAvailable: {
            type: Boolean,
            default: true,
        },

        image: {
            type: String, // optional
        },

        size: {
            type: [String],
            required: false,
        },
    },
    { timestamps: true }
);

const menuItemModel = mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema);
export default menuItemModel