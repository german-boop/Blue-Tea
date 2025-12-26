"use client"
import { NewArticle } from '@/utils/useServerAction';
import React, { useState, useEffect } from 'react'
import { useActionState } from "react";
import swal from 'sweetalert';
import RichEditor from './RichEditor';
import { useRouter } from 'next/navigation';

export default function AddNewArticle({ article }) {
    const router = useRouter();
    const [content, setContent] = useState(article?.content || "");
    const [state, formAction] = useActionState(NewArticle, {
        message: "",
        error: undefined,
        fields: {
            title: article?.title || "",
            author: article?.author || "",
            shortDescription: article?.shortDescription || "",
            content: article?.content || "",
            cover: article?.cover || null,
        }
    });

    useEffect(() => {
        if (state.message === "success") {
            swal({
                title: "Article Saved Successfully :)",
                icon: "success",
                buttons: "ok",
            }).then(() => router.replace("/p-admin/articles"));
        } else if (state.message === "error") {
            swal({
                title: "Please fill out required fields :(",
                icon: "warning",
                buttons: "ok",
            });
        }
    }, [state.message]);

    const handleSubmit = async (formData) => {
        if (article?._id) formData.set("_id", article._id);
        if (!formData.get("content")) formData.set("content", article?.content || "");
        if (!formData.get("title")) formData.set("title", article?.title || "");
        if (!formData.get("author")) formData.set("author", article?.author || "");
        if (!formData.get("shortDescription")) formData.set("shortDescription", article?.shortDescription || "");
        if (!formData.get("cover") && article?.cover) formData.set("cover", article.cover);

        await formAction(formData);
    }

    return (
        <form
            action={handleSubmit}
            className="row g-3" >
            <div className="col-md-6">
                <label className="form-label">Title</label>
                <input
                    type="text"
                    name="title"
                    defaultValue={article?.title}
                    className="form-control"
                    required
                />
            </div>

            <div className="col-md-6">
                <label className="form-label">Author</label>
                <input
                    name="author"
                    type="text"
                    defaultValue={article?.author}
                    className="form-control"
                    required
                />
            </div>

            <div className="col-12">
                <label className="form-label">Short Description</label>
                <input
                    type="text"
                    name="shortDescription"
                    defaultValue={article?.shortDescription}
                    className="form-control"
                    required
                />
            </div>

            <div className="col-12">
                <RichEditor value={content} onChange={setContent} />
                <input type="hidden" name="content" value={content} />
            </div>

            <div className="col-md-6">
                <label className="form-label">Cover Image</label>
                <input
                    type="file"
                    name="cover"
                    className="form-control"
                />
            </div>

            <div className="col-12 d-flex gap-2 mt-4 justify-content-end">
                <button type="submit" name="status" value="unpublish" className="classic">
                    Save Draft
                </button>
                <button type="submit" name="status" value="publish" className="edit">
                    Publish
                </button>
                <button type="reset" className="remove">Reset</button>
            </div>
        </form>
    )
}
