import connectToDB from "@/db/db"
import { authAdmin } from "@/utils/auth"
import contactModel from "@/model/contact"
import { isValidObjectId } from "mongoose"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
    try {
        connectToDB()
        const { id } = params

        if (!isValidObjectId(id)) 
            return NextResponse.json({ message: "Not Valid :)" }, { status: 422 })

        const contact = await contactModel.findOne({ _id: id })
        if (!contact) 
            return NextResponse.json({ message: "Contact Not Found" }, { status: 404 })

        return NextResponse.json({ contact }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "Unknown Error" }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    try {
        connectToDB()
        const admin = await authAdmin()
        if (!admin) throw new Error("This API is Protected")

        const { id } = params
        if (!isValidObjectId(id)) 
            return NextResponse.json({ message: "Not Valid :)" }, { status: 422 })

        await contactModel.findOneAndDelete({ _id: id })
        return NextResponse.json({ message: "Contact Removed Successfully" }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "Unknown Error" }, { status: 500 })
    }
}
