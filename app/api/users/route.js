import connectToDB from "@/db/db";
import UserModal from "@/model/user";
import { authAdmin } from "@/utils/auth";
import { NextResponse } from "next/server";
import { userValidationSchema } from "@/validators/user";

export async function GET(req) {
    try {
        await connectToDB();
        const admin = await authAdmin();
        if (!admin) throw new Error("This API Protected");

        const users = await UserModal.find({})
            .populate("comments", "-email -username")
            .lean();

        if (!users || users.length === 0)
            return NextResponse.json({ message: "Not FOUND" }, { status: 404 });

        return NextResponse.json(users, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectToDB();
        const admin = await authAdmin();
        if (!admin) throw new Error("This API Protected");

        const body = await req.json();
        const parsed = userValidationSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { errors: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const isUserExist = await UserModal.findOne({ email: body.email });
        if (isUserExist) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 409 }
            );
        }

        const newUser = await UserModal.create(parsed.data);

        return NextResponse.json({ message: "User Created Successfully", newUser }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
