import connectToDB from "@/db/db";
import reservationModal from "@/model/reservation";
import { reservationValidationSchema } from "@/validators/reservation";
import { authAdmin } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        connectToDB()
        const admin = await authAdmin()
        if (!admin) throw new Error("This api Protected")

        const { searchParams } = new URL(req.url)
        const page = Number(searchParams.get("page")) || 1
        const limit = Number(searchParams.get("limit")) || 15

        let cursor = null

        if (page > 1) {
            const prevReserve = await reservationModal.find({})
                .sort({ _id: 1 })
                .limit((page - 1) * limit)
                .lean()

            cursor = prevReserve[prevReserve.length - 1]?._id
        }

        const query = cursor ? { _id: { $gt: cursor } } : {}

        const totalCount = await reservationModal.countDocuments()
        const reservations = await reservationModal.find(query)
            .sort({ _id: 1 })
            .limit(limit)
            .lean()

        return NextResponse.json({ reservations, totalCount }, { status: 200, })
    }
    catch (err) {
        return NextResponse.json({ message: "Unknown Error" }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        connectToDB()
        const body = await req.json()
        const parsed = reservationValidationSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { errors: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const isResevationExist = await reservationModal.findOne({ $or: [{ name: body.name }, { phone: body.phone }] })
        if (isResevationExist) {
            return NextResponse.json(
                { message: "Reservation already exists" },
                { status: 409 }
            )
        }

        await reservationModal.create(parsed.data)
        return NextResponse.json({ message: "reservation created successfully" }, { status: 200, })
    }
    catch (err) {
        return NextResponse.json({ message: "Unknown Error" }, { status: 500 })
    }
}
