import connectToDB from "@/db/db";
import ProductModal from "@/model/product";
import CategoryModel from "@/model/category";
import { authAdmin } from "@/utils/auth";
import path from "path";
import { writeFile } from "fs/promises";
import { productSchema } from "@/validators/product";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        connectToDB()
        const admin = await authAdmin()
        if (!admin) throw new Error("This api Protected")

        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;
        const limit = Number(searchParams.get("limit")) || 10;
        const categoryName = searchParams.get("category")

        let categoryId;
        if (categoryName) {
            const category = await CategoryModel.findOne({ name: categoryName }).lean();
            if (category) categoryId = category._id;
        }

        let cursor = null
        const queryBase = categoryId ? { category: categoryId } : {}

        if (page > 1) {
            const prevProducts = await ProductModal
                .find(queryBase)
                .sort({_id : 1})
                .limit((page - 1) * limit)
                .lean()
            cursor = prevProducts[prevProducts.length - 1]?._id
        }

        const query = cursor
            ? { _id: { $gt: cursor }, ...queryBase }
            : queryBase;

        const totalCount = await ProductModal.countDocuments(query);
        const products = await ProductModal
            .find(query, "-__v")
            .sort({ _id: 1 })
            .limit(limit)
            .lean();

        return NextResponse.json({ products, totalCount }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: "Unknown Error" }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        connectToDB()
        const admin = await authAdmin()
        if (!admin) throw new Error("This api Protected")

        const formData = await req.formData();
        const body = Object.fromEntries(formData.entries());

        body.price = Number(body.price);
        body.score = Number(body.score);
        body.tags = body.tags?.split(",").map(t => t.trim());
        body.size = body.size?.split(",").map(s => s.trim());

        const parsed = productSchema.safeParse(body);
        if (!parsed.success)
            return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });

        const img = formData.get("img");
        if (!img) return NextResponse.json({ message: "Image is required" }, { status: 400 });

        const buffer = Buffer.from(await img.arrayBuffer());
        const filename = Date.now() + img.name;
        await writeFile(path.join(process.cwd(), "public/uploads/" + filename), buffer);

        const isProductExist = await ProductModal.findOne({ name: body.name });
        if (isProductExist)
            return NextResponse.json({ message: "This Product Already Exists :(" }, { status: 409 });

        await ProductModal.create({
            ...parsed.data,
            img: `http://localhost:3000/uploads/${filename}`,
            isAvailable: true
        });

        return NextResponse.json({ message: "Product Created Successfully" }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "Unknown Error" }, { status: 500 })
    }
}
