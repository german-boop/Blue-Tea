import connectToDB from "@/db/db";
import WishlistModal from "@/model/wishList";
import ProductModal from "@/model/product";
import { getMe } from "@/utils/auth";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { searchParams }) {
    try {
        await connectToDB();
        const user = await getMe();
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        let wishlist = null
        let totalCount = null

        if (!user) return toast.error("please Loggin First:(")

        const page = await searchParams.get("page") || 1
        const limit = await searchParams.get("limit") || 15

        let cursor = null
        if (page > 1) {
            const prevFavorites = await WishlistModal
                .find({ user: user._id })
                .sort({ _id: 1 })
                .skip((page - 1) * limit - 1)
                .limit(1)
                .select("_id")
                .lean();
            cursor = prevFavorites[0]?._id;

        }

        const query = cursor ? { _id: { $gt: cursor } } : {};
        totalCount = await WishlistModal.countDocuments();

        wishlist = await WishlistModal
            .find({ ...query, user: user._id })
            .sort({ _id: 1 })
            .limit(limit)
            .populate("user")
            .populate("products")
            .lean();
        return NextResponse.json({ wishlist, totalCount }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Unknown Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectToDB();
        const user = await getMe();
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { productID } = body;

        if (!isValidObjectId(productID)) return NextResponse.json({ message: "Invalid Product ID" }, { status: 422 });

        const product = await ProductModal.findById(productID);
        if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });

        const exists = await WishlistModal.findOne({ user: user._id, products: productID });
        if (exists) return NextResponse.json({ message: "Product already in wishlist" }, { status: 409 });

        await WishlistModal.findOneAndUpdate(
            { user: user._id },
            { $push: { products: productID } },
            { upsert: true }
        );

        return NextResponse.json({ message: "Product added to wishlist" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Unknown Error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectToDB();
        const user = await getMe();
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const productID = searchParams.get("productID");

        if (!isValidObjectId(productID)) return NextResponse.json({ message: "Invalid Product ID" }, { status: 422 });

        await WishlistModal.findOneAndUpdate(
            { user: user._id },
            { $pull: { products: productID } }
        );

        return NextResponse.json({ message: "Product removed from wishlist" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Unknown Error" }, { status: 500 });
    }
}
