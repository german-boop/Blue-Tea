"use server"
import { reservationValidationSchema } from "@/validators/reservation";
import connectToDB from "@/db/db";
import reservationModal from "@/model/reservation";
import ArticleModel from "@/model/article";
import { menuSchema } from "@/validators/menuItem";
import { productSchema } from "@/validators/product";
import { articleSchema } from "@/validators/article";
import ProductModal from "@/model/product";
import menuItemModel from "@/model/menuItem";
import { writeFile } from "fs/promises";
import path from "path";

export async function NewReservation(prevState, formData) {

    try {
        connectToDB()
        const body = Object.fromEntries(formData.entries());

        body.guests = Number(body.guests);
        const parsed = reservationValidationSchema.safeParse(body);

        if (!parsed.success) {
            return {
                message: "error",
                error: "plaese Fill out required fields",
            }

        }

        const name = formData.get("name")
        const phone = formData.get("phone")

        const isResevationExist = await reservationModal.findOne({ $or: [{ name }, { phone }] })

        if (!isResevationExist) {
            await reservationModal.create(parsed.data)
        }
        return {
            message: "success",
            error: undefined,
            feilds: {
                name: "",
                email: "",
                phone: "",
                date: "",
                time: "",
                guests: "",
                notes: "",
            }
        }
    }

    catch (err) {
        return { success: false }
    }
}

export async function NewProduct(prevState, formData) {

    try {
        connectToDB()
        const body = Object.fromEntries(formData.entries());

        body.price = Number(body.price);

        if (body.score) {
            body.score = Number(body.score);
        }

        // Convert tags string to array
        if (body.tags) {
            body.tags = body.tags.split(",").map(t => t.trim());
        }

        if (body.variants) {
            body.variants = body.variants.split(",").map(v => v.trim());
        }

        const parsed = productSchema.safeParse(body);


        if (!parsed.success) {
            return Response.json(
                { errors: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }


        const img = formData.get("img")
        const name = formData.get("name")


        const buffer = Buffer.from(await img.arrayBuffer())
        const filename = Date.now() + img.name
        await writeFile(path.join(process.cwd(), "public/uploads/" + filename), buffer)

        const isProductExist = await ProductModal.findOne({ name })

        if (!isProductExist) {
            await ProductModal.create({
                ...parsed.data,
                img: `http://localhost:3000/uploads/${filename}`
            })
        }
        return {
            message: "success",
            error: undefined,
            feilds: {
                name: "",
                price: "",
                longDescription: "",
                shortDescription: "",
                isAvailable: "",
                score: "",
                size: "",
                tags: "",
                category: "",
                img: ""
            }
        }
    }

    catch (err) {
        return { message: "error" }
    }
}

export async function NewArticle(prevState, formData) {
    try {
        connectToDB();

        const body = Object.fromEntries(formData.entries());
        const parsed = articleSchema.safeParse(body);

        if (!parsed.success) {
            return {
                message: "error",
                errors: parsed.error.flatten().fieldErrors
            };
        }

        const status = formData.get("status");
        const title = formData.get("title");
        const content = formData.get("content");
        const author = formData.get("author");
        const shortDescription = formData.get("shortDescription");

        const draftArticle = await ArticleModel.findOne({ title, status: "unpublish" });

        const coverFile = formData.get("cover");
        let coverUrl = draftArticle?.cover || "";

        if (coverFile && coverFile.size) {
            const buffer = Buffer.from(await coverFile.arrayBuffer());
            const filename = Date.now() + coverFile.name;
            await writeFile(path.join(process.cwd(), "public/uploads/" + filename), buffer);
            coverUrl = `http://localhost:3000/uploads/${filename}`;
        }

        if (draftArticle) {
            await ArticleModel.findByIdAndUpdate(draftArticle._id, {
                title,
                author,
                shortDescription,
                content,
                cover: coverUrl,
                status
            });
        } else {
            await ArticleModel.create({
                title,
                author,
                shortDescription,
                content,
                cover: coverUrl,
                status
            });
        }

        return {
            message: "success",
            fields: {
                title: "",
                author: "",
                shortDescription: "",
                content: "",
                cover: ""
            }
        };
    } catch (err) {
        return { message: "error" };
    }
}

export async function NewMenuItem(prevState, formData) {
    try {
        connectToDB();

        const body = Object.fromEntries(formData.entries());
        body.price = Number(body.price);
        body.size = body.size?.split(",").map(s => s.trim());

        const parsed = menuSchema.safeParse(body);
        if (!parsed.success) {
            return Response.json(
                { errors: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }
        const isMenuItemExist = await menuItemModel.findOne({ name: body.name })
        if (isMenuItemExist) {
            return NextResponse.json(
                { message: "menuItem already exists" },
                { status: 409 }
            )
        }


        let imagePath;
        const image = formData.get("img");
        if (image && image.size > 0) {
            const buffer = Buffer.from(await image.arrayBuffer());
            const filename = Date.now() + image.name;
            await writeFile(path.join(process.cwd(), "public/uploads/" + filename), buffer);
            imagePath = `http://localhost:3000/uploads/${filename}`;
        }

        await menuItemModel.create({
            ...parsed.data,
            image: imagePath,
        });

        return {
            message: "success",
            fields: {
                name: "",
                price: "",
                description: "",
                size: "",
                image: ""
            }
        };
    } catch (err) {
        return { message: "error" };
    }
}

