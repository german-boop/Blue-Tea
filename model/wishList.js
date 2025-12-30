import mongoose from "mongoose";
import UserModal from "./user";
import ProductModal from "./product";

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      }
    ],
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

const WishlistModal = mongoose.models.WishList || mongoose.model("WishList", wishlistSchema);

export default WishlistModal;
