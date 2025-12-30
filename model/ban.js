const mongoose = require("mongoose")
const schema = mongoose.Schema({

    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    }
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


const BanModal = mongoose.models.Ban || mongoose.model("Ban", schema)

export default BanModal