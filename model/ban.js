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
        timestamps: true
    });


const BanModal = mongoose.models.Ban || mongoose.model("Ban", schema)

export default BanModal