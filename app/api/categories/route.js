import connectToDB from "@/db/db"
import CategoryModel from "@/model/category"
import { NextResponse } from "next/server"
export async function GET() {
    try {
        connectToDB()
        const categories = await CategoryModel.find({}, "-__v")
        return NextResponse.json({ categories }, { status: 200 })
    }
    catch (err) {
        return NextResponse.json({ message: "UnKnown Error" }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        connectToDB()
        const reqBody = await req.json()
        const { name, slug, parentId } = reqBody

        if (!name.trim()) return NextResponse.json({ message: "Title Not Valid :(" }, { status: 422 })
        const iscategoryExisted = await CategoryModel.findOne({ name })
        if (iscategoryExisted) {
            return NextResponse.json(
                { message: "Category already exists" },
                { status: 409 }
            )
        }

        await CategoryModel.create({
            name, slug, parentId
        })

        return NextResponse.json({ message: "Category created Successfully" }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "UnKnown Error" }, { status: 500 })
    }

}
