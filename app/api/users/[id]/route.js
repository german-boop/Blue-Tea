import connectToDB from "@/db/db"
import UserModal from "@/model/user"
import { authAdmin, verifyPassword, hashPassword } from "@/utils/auth"
import { userValidationSchema } from "@/validators/user"
import { writeFile } from "fs/promises"
import path from "path"
import { isValidObjectId } from "mongoose"
import { NextResponse } from "next/server"

export async function PUT(req, { params }) {
    try {
        connectToDB()
        const { id } = await params

        if (!isValidObjectId(id))
            return NextResponse.json({ message: "Not Valid ID" }, { status: 422 })

        const formData = await req.formData()
        const body = Object.fromEntries(formData.entries());
        const parsed = userValidationSchema.safeParse(body);

        if (!parsed.success)
            return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });

        const password = formData.get("password")
        const newPassword = formData.get("newPassword")
        const confirmPassword = formData.get("confirmPassword")
        const avatar = formData.get("avatar")

        if (newPassword && newPassword !== confirmPassword)
            return NextResponse.json({ message: "Passwords Do Not Match" }, { status: 422 })

        const user = await UserModal.findById(id)
        if (!user) return NextResponse.json({ message: "User Not Found" }, { status: 404 })

        const verifiedPassword = verifyPassword(password, user.password)

        if (!verifiedPassword) return NextResponse.json({ message: "Current Password Not Valid" }, { status: 422 })

        let hashedPassword = user.password
        if (newPassword) hashedPassword = await hashPassword(confirmPassword)

        let avatarUrl = user.avatar
        if (avatar) {
            const buffer = Buffer.from(await avatar.arrayBuffer())
            const filename = Date.now() + avatar.name
            await writeFile(path.join(process.cwd(), "public/uploads/" + filename), buffer)
            avatarUrl = `http://localhost:3000/uploads/${filename}`
        }

        await UserModal.findByIdAndUpdate(id, {
            $set: {
                ...parsed.data,
                avatar: avatarUrl,
                password: hashedPassword
            }
        })

        return NextResponse.json({ message: "User Updated Successfully" }, { status: 200 })

    } catch (err) {

        return NextResponse.json({ message: "Unknown Error" }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    try {
        connectToDB()
        const admin = await authAdmin()
        if (!admin) throw new Error("This API Protected")

        const { id } = params
        if (!isValidObjectId(id))
            return NextResponse.json({ message: "Not Valid ID" }, { status: 422 })

        await UserModal.findByIdAndDelete(id)
        return NextResponse.json({ message: "User Removed Successfully" }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "Unknown Error" }, { status: 500 })
    }
}
