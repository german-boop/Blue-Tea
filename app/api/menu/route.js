import connectToDB from "@/db/db"
import { menuSchema } from "@/validators/menuItem"
import menuItemModel from "@/model/menuItem"
import path from "path"
import { authAdmin } from "@/utils/auth"
import { writeFile } from "fs/promises"
export async function GET() {
    try {
        connectToDB()
        const menuItems = await menuItemModel.find({}, "-__v")
        return Response.json(menuItems, { status: 200 })

    }
    catch (err) {
        return Response.json({ message: "UnKnown Error" }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        connectToDB()

        const admin = await authAdmin()
        if (!admin) throw new Error("This api Protected")


        const formData = await req.formData()
        const body = Object.fromEntries(formData.entries());
        body.price = Number(body.price);

        const parsed = menuSchema.safeParse(body);

        if (!parsed.success) {
            return Response.json(
                { errors: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const image = formData.get("img")

        const buffer = Buffer.from(await image.arrayBuffer())
        const filename = Date.now() + image.name
        await writeFile(path.join(process.cwd(), "public/uploads/" + filename), buffer)

        const isMenuItemExist = await menuItemModel.findOne({ name: body.name })

        if (isMenuItemExist) {
            return NextResponse.json(
                { message: "Article already exists" },
                { status: 409 }
            )
        }
        await menuItemModel.create({
            ...parsed.data,
            image: `http://localhost:3000/uploads/${filename}`
        })

        return Response.json({ message: "This Item created Successfully" }, { status: 200 })
    } catch (err) {
        return Response.json({ message: "UnKnown Error" }, { status: 500 })
    }

}
