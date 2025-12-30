import mongoose from "mongoose";
import UserModal from "./user";

const ReservationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            trim: true,
        },

        date: {
            type: String,
            required: true,
        },

        time: {
            type: String,
            required: true,
        },

        guests: {
            type: Number,
            required: true,
            min: 1,
        },

        notes: {
            type: String,
            trim: true, // optional message
        },

        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending",
        },
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

const reservationModal = mongoose.models.Reservation ||
    mongoose.model("Reservation", ReservationSchema);

export default reservationModal