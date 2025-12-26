import connectToDB from "@/db/db";
import ProductModel from "@/model/product";
import { isValidObjectId } from "mongoose";
import { productSchema } from "@/validators/product";
import { authAdmin } from "@/utils/auth";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

/* ===================== GET ===================== */
export async function GET(req, { params }) {
    try {
        await connectToDB();
        const { id } = params;
        if (!isValidObjectId(id)) return NextResponse.json({ message: "Invalid ID" }, { status: 422 });

        const product = await ProductModel.findById(id).lean();
        if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });

        return NextResponse.json(product, { status: 200 });
    } catch {
        return NextResponse.json({ message: "Unknown Error" }, { status: 500 });
    }
}

/* ===================== DELETE ===================== */
export async function DELETE(req, { params }) {
    try {
        await connectToDB();

        const admin = await authAdmin();
        if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const { id } = params;
        if (!isValidObjectId(id)) return NextResponse.json({ message: "Invalid ID" }, { status: 422 });

        await ProductModel.findByIdAndDelete(id);

        return NextResponse.json({ message: "Product removed" }, { status: 200 });
    } catch {
        return NextResponse.json({ message: "Unknown Error" }, { status: 500 });
    }
}

/* ===================== PUT ===================== */
export async function PUT(req, { params }) {
    try {
        await connectToDB();

        const admin = await authAdmin();
        if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const { id } = await params;
        if (!isValidObjectId(id)) return NextResponse.json({ message: "Invalid ID" }, { status: 422 });

        const formData = await req.formData();
        const body = Object.fromEntries(formData.entries());

        if (body.price) body.price = Number(body.price);
        if (body.score) body.score = Number(body.score);
        if (body.tags) {
            body.tags = body.tags.split(",").map(t => t.trim());
        }
        if (body.size) {
            body.size = body.size.split(",").map(s => s.trim());
        }
        console.log(body);
        

        // PUT => partial validation
        const parsed = productSchema.partial().safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { errors: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        /* optional image upload */
        const img = formData.get("img");
        let imageUrl;

        if (img && typeof img === "object" && img.size > 0) {
            const buffer = Buffer.from(await img.arrayBuffer());
            const filename = Date.now() + "-" + img.name;
            await writeFile(
                path.join(process.cwd(), "public/uploads", filename),
                buffer
            );
            imageUrl = `/uploads/${filename}`;
        }

        await ProductModel.findByIdAndUpdate(id, {
            $set: {
                ...parsed.data,
                ...(imageUrl && { img: imageUrl }),
            },
        });

        return NextResponse.json({ message: "Product updated" }, { status: 200 });
    } catch {
        return NextResponse.json({ message: "Unknown Error" }, { status: 500 });
    }
}
