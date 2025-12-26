
const mongoose = require("mongoose");
import UserModal from "./user";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    author: {
        type: String,
        required: true,
    },

    shortDescription: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
        default: "unpublish",
        enum: ["publish", "unpublish"]
    },
},
    {
        timestamps: true,
    }
);

const ArticleModel = mongoose.models.Article || mongoose.model("Article", schema);

export default ArticleModel;


