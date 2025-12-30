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
},
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        }
    }

);


const UserModal = mongoose.models.User || mongoose.model("User", schema)

export default UserModal