import connectToDB from "@/db/db";
import menuItemModel from "@/model/menuItem";
import { isValidObjectId } from "mongoose";
import { authAdmin } from "@/utils/auth";
import { menuSchema } from "@/validators/menuItem";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET(req, { params }) {
    try {
        connectToDB();
        const admin = await authAdmin();
        if (!admin) throw new Error("This API Protected");

        const { id } = params;
        if (!isValidObjectId(id)) return NextResponse.json({ message: "Not Valid :)" }, { status: 422 });

        const menuItem = await menuItemModel.findOne({ _id: id }).lean();
        if (!menuItem) throw new Error("Failed to get data");

        return NextResponse.json(menuItem, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        connectToDB();
        const admin = await authAdmin();
        if (!admin) throw new Error("This API Protected");

        const { id } = await params;
        if (!isValidObjectId(id)) return NextResponse.json({ message: "Not Found" }, { status: 404 });

        await menuItemModel.findOneAndDelete({ _id: id });
        return NextResponse.json({ message: "Item Removed" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Unknown Error" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        connectToDB();
        const admin = await authAdmin();
        if (!admin) throw new Error("This API Protected");

        const { id } = await params;
        if (!isValidObjectId(id)) return NextResponse.json({ message: "Not Valid :)" }, { status: 422 });

        const formData = await req.formData();
        const body = Object.fromEntries(formData.entries());
        console.log(body);

        if (body.price) body.price = Number(body.price);

        // parse data with schema
        const parsed = menuSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { errors: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        // handle image only if it's uploaded
        let imagePath;
        const image = formData.get("img");
        if (image && image.size > 0) {
            const buffer = Buffer.from(await image.arrayBuffer());
            const filename = Date.now() + image.name;
            await writeFile(path.join(process.cwd(), "public/uploads/" + filename), buffer);
            imagePath = `http://localhost:3000/uploads/${filename}`;
        }

        const updateData = { ...parsed.data };
        if (imagePath) updateData.image = imagePath;

        await menuItemModel.findOneAndUpdate({ _id: id }, { $set: updateData });
        return NextResponse.json({ message: "Menu Updated" }, { status: 200 });
    } catch (err) {
        console.log(err);

        return NextResponse.json({ message: "Unknown Error" }, { status: 500 });
    }
}
