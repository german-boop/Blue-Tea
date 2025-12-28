import connectToDB from "@/db/db"
import ArticleModel from "@/model/article"
import { authAdmin } from "@/utils/auth"
import path from "path"
import { articleSchema } from "@/validators/article"
import { writeFile } from "fs/promises"
import { NextResponse } from "next/server"
export async function GET(req) {
    try {
        await connectToDB();

        const { searchParams } = new URL(req.url);
        const useCursor = searchParams.has("cursor");

        const result = await paginate(
            ArticleModel,   // Model
            searchParams,   // searchParams
            {},             // filter
            null,           // populate
            useCursor       // cursor | pagination
        );
        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Unknown Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        connectToDB()
        const admin = await authAdmin()
        if (!admin) throw new Error("This api Protected")

        const formData = await req.formData()
        const body = Object.fromEntries(formData.entries());

        const parsed = articleSchema.safeParse(body);

        if (!parsed.success) {
            return Response.json(
                { errors: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const cover = formData.get("cover");
        const buffer = Buffer.from(await cover.arrayBuffer())
        const filename = Date.now() + cover.name
        await writeFile(path.join(process.cwd(), "public/uploads/" + filename), buffer)

        const isArticletExist = await ArticleModel.findOne({ title: body.title })
        if (isArticletExist) {
            return NextResponse.json(
                { message: "Article already exists" },
                { status: 409 }
            )
        }

        const article = await ArticleModel.create({
            ...parsed.data,
            cover: `http://localhost:3000/uploads/${filename}`
        })
        return NextResponse.json({ message: "article Created Successfully" },
            { status: 200 }, { data: article })

    } catch (err) {

        return NextResponse.json({ message: err.message }, { status: 500 })
    }

}


