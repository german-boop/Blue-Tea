const mongoose = require("mongoose");
import ProductModal from "./product";
import UserModal from "./user";

const schema = new mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    isAccept: {
        type: Boolean,
        default: false,
        required: true
    },
    date: {
        type: Date,
        default: () => Date.now(),
        immutable: false,
    },
    body: {
        type: String,
        required: true,
    },

    productID: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    answer: [
        {
            text: String,
            admin: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "USER"
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const commentModel = mongoose.models.Comment || mongoose.model("Comment", schema);

export default commentModel;
