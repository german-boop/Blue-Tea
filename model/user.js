const mongoose = require("mongoose")
const schema = mongoose.Schema({
    name: {
        type: String,
        default: "User CoffeSet"
    },
    phone: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,

    },
    avatar: {
        type: String,
        required: false,
    },

    role: {
        type: String,
        required: true,
    }

    , refreshToken: {
        type: String,
        required: true,
    },
    resetCode: { type: String, required: false },
    resetCodeExpire: { type: Date, required: false },
}, {
    timestamps: true
});


const UserModal = mongoose.models.User || mongoose.model("User", schema)

export default UserModal