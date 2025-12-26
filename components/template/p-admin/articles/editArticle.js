"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { usePut } from '@/utils/hooks/useReactQueryPanel';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import RichEditor from './RichEditor';
export default function EditArticle({ data }) {
    const router = useRouter()
    const [form, setForm] = useState({
        title: "",
        author: "",
        shortDescription: "",
        content: "",
        cover: "",
    });

    useEffect(() => {
        if (data) {
            setForm({
                title: data.title || "",
                author: data.author || "",
                shortDescription: data.shortDescription || "",
                content: data.content || "",
                cover: data.cover || null,
            });
        }
    }, [data]);

    // PUT article
    const { mutate } = usePut("/articles", {
        onSuccess: () => {
            toast.success("article Editted Successfully :)"),
                router.push("/p-admin/articles");
        },
        onError: () => toast.error("Error updating article"),
    });

    const handleEdit = (e) => {
        e.preventDefault();

        swal({
            title: "Are You Sure To Edit This item?",
            icon: "warning",
            buttons: ["No", "Yes"],
        }).then((result) => {
            if (!result) return;

            const formData = new FormData();
            const id = data._id
            formData.append("_id", id);
            formData.append("title", form.title);
            formData.append("author", form.author);
            formData.append("shortDescription", form.shortDescription);
            formData.append("content", form.content);
            formData.append("cover", form.cover);

            mutate({ id, payload: formData });
        });
    };
    return (
        <form className="row g-3">
            <div className="col-md-6">
                <label className="form-label">Title</label>
                <input
                    type="text"
                    className="form-control"
                    value={form.title}
                    onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                    required
                />
            </div>
            <div className="col-md-6">
                <label className="form-label">Author</label>
                <input
                    type="text"
                    className="form-control"
                    value={form.author}
                    onChange={(e) => setForm(prev => ({ ...prev, author: e.target.value }))}
                    required
                />
            </div>
            <div className="col-12">
                <label className="form-label">Short Description</label>
                <input
                    type="text"
                    className="form-control"
                    value={form.shortDescription}
                    onChange={(e) => setForm(prev => ({ ...prev, shortDescription: e.target.value }))}
                    required
                />
            </div>
            {form.content !== "" && (
                <RichEditor
                    value={form.content}
                    onChange={(val) => setForm(prev => ({ ...prev, content: val }))}
                />
            )}
            <div className="col-md-6">
                <label className="form-label">Cover Image URL</label>
                <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setForm(prev => ({ ...prev, cover: e.target.files[0] }))}
                    placeholder="https://example.com/image.jpg"
                />
            </div>

            <div className="col-12 d-flex justify-content-end mt-4">
                <button
                    onClick={(e) => handleEdit(e)}
                    className="edit">
                    Edit
                </button>
            </div>
        </form>
    )
}
