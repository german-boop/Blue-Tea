import connectToDB from "@/db/db"
import CategoryModel from "@/model/category"
import { isValidObjectId } from "mongoose"
import { authAdmin } from "@/utils/auth"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
    try {
        connectToDB()
        const admin = await authAdmin()
        if (!admin) throw new Error("This api Protected")

        const { id } = await params
        const isvalidId = isValidObjectId(id)

        if (!isvalidId) return NextResponse.json({ message: "Not Valid :)" }, { status: 422 })

        const category = await CategoryModel.findOne({ _id: id }).lean()
        if (!category) throw new Error(`Failed to get data`);

        return NextResponse.json(category, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    try {
        connectToDB()
        const admin = await authAdmin()
        if (!admin) throw new Error("This api Protected")

        const { id } = await params

        if (!isValidObjectId(id)) return NextResponse.json({ message: "Not Found" }, { status: 404 })

        await CategoryModel.findOneAndDelete({ _id: id })
        return NextResponse.json({ message: "category Removed" }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "UnKnown Error" }, { status: 200 })
    }
}


export async function PUT(req, { params }) {
    connectToDB()
    try {
        const admin = await authAdmin()
        if (!admin) throw new Error("This api Protected")

        const { id } = await params
        if (!isValidObjectId(id)) return NextResponse.json({ message: "Not Found" }, { status: 404 })

        const reqBody = await req.json()
        await CategoryModel.findOneAndUpdate({ _id: id }, {
            $set: reqBody
        })
        return NextResponse.json({ message: "category Updated" }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "UnKnown Error" }, { status: 200 })
    }

}

