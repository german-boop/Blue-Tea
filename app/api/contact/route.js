import connectToDB from "@/db/db"
import contactModel from "@/model/contact"
import { contactValidationSchema } from "@/validators/contact"
import { getMe } from "@/utils/auth"
import { NextResponse } from "next/server"
import { authAdmin } from "@/utils/auth"
export async function GET(req) {
    try {
        connectToDB()
        const admin = await authAdmin()
        if (!admin) throw new Error("This API is protected")

        const { searchParams } = new URL(req.url)
        const page = Number(searchParams.get("page")) || 1
        const limit = Number(searchParams.get("limit")) || 15

        let cursor = null
        if (page > 1) {
            const prevContacts = await contactModel
                .find({})
                .sort({ _id: 1 })
                .limit((page - 1) * limit)
                .lean()
            cursor = prevContacts[prevContacts.length - 1]?._id
        }

        const query = cursor ? { _id: { $gt: cursor } } : {}
        const totalCount = await contactModel.countDocuments()
        const contacts = await contactModel
            .find(query)
            .sort({ _id: 1 })
            .limit(limit)
            .lean()

        return NextResponse.json({ contacts, totalCount }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "Unknown Error" }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        connectToDB()
        const user = await getMe()
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

        const reqBody = await req.json()
        const parsed = contactValidationSchema.safeParse(reqBody)

        if (!parsed.success) {
            return NextResponse.json(
                { errors: parsed.error.flatten().fieldErrors },
                { status: 400 }
            )
        }

        await contactModel.create(parsed.data)
        return NextResponse.json({ message: "Request sent successfully" }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "Unknown Error" }, { status: 500 })
    }
}
