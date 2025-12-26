const mongoose = require("mongoose");


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: false,
    },

    body: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: () => Date.now(),
        immutable: false,
    },
});

const contactModel = mongoose.models.Contact || mongoose.model("Contact", schema);

export default contactModel;
