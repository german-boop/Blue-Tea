import connectToDB from "@/db/db"
import { isValidObjectId } from "mongoose"
import reservationModal from "@/model/reservation"
import { reservationValidationSchema } from "@/validators/reservation"
import { authAdmin } from "@/utils/auth"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
    try {
        connectToDB()
        const { id } = await params
        const isvalidId = isValidObjectId(id)
        if (!isvalidId) return NextResponse.json({ message: "Not Valid :)" }, { satatus: 422 })

        const reservation = await reservationModal.findOne({ _id: id })
        return NextResponse.json(reservation, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "UnKnown Error" }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    try {
        connectToDB()
        const admin = await authAdmin()
        if (!admin) throw new Error("This api Protected")

        const { id } = await params
        const isvalidId = isValidObjectId(id)

        if (!isvalidId) return NextResponse.json({ message: "Not Valid :)" }, { satatus: 422 })

        await reservationModal.findOneAndDelete({ _id: id })
        return NextResponse.json({ message: "Product Removed" }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "UnKnown Error" }, { status: 500 })
    }
}


export async function PUT(req, { params }) {
    try {
        connectToDB()
        const { id } = await params
        const isvalidId = isValidObjectId(id)

        if (!isvalidId) return Response.json({ message: "Not Valid :)" }, { satatus: 422 })

        const body = await req.json()
        const parsed = reservationValidationSchema.safeParse(body);

        if (!parsed.success) {
            return Response.json(
                { errors: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        await reservationModal.findOneAndUpdate({ _id: id }, {
            $set: parsed.data
        }
        )
        return Response.json({ message: "reservation created successfully" }, { status: 200, })

    } catch (err) {
        return Response.json({ message: "UnKnown Error" }, { status: 500 })
    }

}

