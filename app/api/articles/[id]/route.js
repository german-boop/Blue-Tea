import ArticleModel from "@/model/article"
import connectToDB from "@/db/db"
import { isValidObjectId } from "mongoose"
import { authAdmin } from "@/utils/auth"
import { writeFile } from "fs/promises"
import { articleSchema } from "@/validators/article"
import path from "path"
import { NextResponse } from "next/server"
import { log } from "console"

export async function GET(req, { params }) {
    try {
        connectToDB()
        const admin = await authAdmin()
        if (!admin) throw new Error("This api Protected")

        const { id } = await params
        const isvalidId = isValidObjectId(id)

        if (!isvalidId) return NextResponse.json({ message: "Not Valid :)" }, { satatus: 422 })

        const article = await ArticleModel.findOne({ _id: id }).lean()
        if (!article) NextResponse.json({ message: "Not Found" }, { status: 404 })

        return NextResponse.json(article, { status: 200 })

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

        await ArticleModel.findOneAndDelete({ _id: id })
        return NextResponse.json({ message: "Article Removed" }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "UnKnown Error" }, { status: 200 })
    }
}


export async function PUT(req, { params }) {
    connectToDB();
    try {
        const admin = await authAdmin();
        if (!admin) throw new Error("This api Protected");

        const { id } = await params;

        const existingArticle = await ArticleModel.findById(id);
        if (!existingArticle) {
            return NextResponse.json({ message: "Article not found" }, { status: 404 });
        }

        const formData = await req.formData();
        const body = Object.fromEntries(formData.entries());        

        const parsed = articleSchema.safeParse(body);
        console.log(parsed);
        

        if (!parsed.success) {
            return NextResponse.json(
                { errors: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }               

        const cover = formData.get("cover");        
        let coverUrl = existingArticle.cover;

        if (cover && cover.size) {
            const buffer = Buffer.from(await cover.arrayBuffer());
            const filename = Date.now() + "-" + cover.name;
            await writeFile(path.join(process.cwd(), "public/uploads/" + filename), buffer);
            coverUrl = `/uploads/${filename}`;
        }

        await ArticleModel.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    title: parsed.data.title,
                    author: parsed.data.author,
                    shortDescription: parsed.data.shortDescription,
                    content: parsed.data.content,
                    cover: coverUrl

                },
            }
        );

        return NextResponse.json({ message: "Article Updated" }, { status: 200 });
    } catch (err) {        
        return NextResponse.json({ message: "UnKnown Error" }, { status: 500 });
    }
}
