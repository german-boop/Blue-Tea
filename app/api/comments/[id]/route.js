import connectToDB from "@/db/db";
import { authAdmin } from "@/utils/auth";
import commentModel from "@/model/comment";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        connectToDB();
        const { id } = await params;

        if (!isValidObjectId(id)) 
            return NextResponse.json({ message: "Not valid ID" }, { status: 422 });

        const comment = await commentModel.findOne({ _id: id });
        return NextResponse.json({ comment }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Unknown error" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        connectToDB();
        const admin = await authAdmin();
        if (!admin) throw new Error("This API is protected");

        const { id } = await params;

        if (!isValidObjectId(id)) 
            return NextResponse.json({ message: "Not valid ID" }, { status: 422 });

        const { content } = await req.json();

        await commentModel.findOneAndUpdate(
            { _id: id },
            { $set: { body: content } }
        );

        return NextResponse.json({ message: "Comment updated successfully" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Unknown error" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        connectToDB();
        const admin = await authAdmin();
        if (!admin) throw new Error("This API is protected");

        const { id } = await params;

        if (!isValidObjectId(id)) 
            return NextResponse.json({ message: "Not valid ID" }, { status: 422 });

        await commentModel.findOneAndDelete({ _id: id });

        return NextResponse.json({ message: "Comment removed successfully" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Unknown error" }, { status: 500 });
    }
}
