"use client"
import { NewProduct } from '@/utils/useServerAction';
import React from 'react'
import { useActionState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';

export default function AddNewProduct({ tree }) {
    const router = useRouter()
    const [state, formAction] = useActionState(NewProduct, {
        message: "",
        error: undefined,
        fields: {
            name: "",
            price: "",
            longDescription: "",
            shortDescription: "",
            isAvailable: "",
            score: "",
            variants: "",
            tags: "",
            category: "",
            img: ""
        }
    })

    useEffect(() => {
        if (state.message === "success") {
            swal({
                title: "Product Saved Successfully :)",
                icon: "success",
                buttons: "ok",
            }).then(() => router.replace("/p-admin/products"));
        } else if (state.message === "error") {
            swal({
                title: "Plaese Fill out required Fields :(",
                icon: "warning",
                buttons: "ok",
            })
        }
    }, [state.message, router])

    return (
        <>
            <form
                action={async (formData) => {
                    await formAction(formData);
                }}
                className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Product Name</label>
                    <input type="text"
                        name='name'
                        className="form-control"
                        required />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Price</label>
                    <input
                        name='price'
                        type="number"
                        className="form-control" required />
                </div>

                <div className="col-12">
                    <label className="form-label">Short Description</label>
                    <input type="text"
                        name='shortDescription'
                        className="form-control" required />
                </div>

                <div className="col-12">
                    <label className="form-label">Long Description</label>
                    <textarea rows="4"
                        name='longDescription'
                        className="form-control" required></textarea>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Image URL</label>
                    <input type="file"
                        accept="image/*"
                        name='img'
                        className="form-control" />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Category</label>
                    <select className="form-select"
                        name='category' defaultValue="-1" required>
                        <option value="-1" disabled>Select category</option>
                        {tree.map((cat, index) => (
                            cat.slug === "shop" &&
                            cat.children.map((item, index) => (
                                <option value={item._id}
                                    key={index + 1}>{item.name}</option>
                            ))
                        ))}
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Tags</label>
                    <input type="text"
                        name='tags'
                        className="form-control"
                        placeholder="organic, herbal-tea, relaxing, healthy" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Variants</label>
                    <input type="text"
                        name='variants'
                        className="form-control"
                        placeholder="100g, 250g, 500g" />
                </div>
                <div className="d-flex align-items-center
             gap-1" style={{ width: "50px" }}>
                    <input type="checkbox"
                        name='isAvailable' />
                    <span>Available</span>
                </div>
                <div className="col-12 d-flex gap-2 mt-5 justify-content-end">
                    <button className="edit">Create</button>
                    <button type="reset" className="remove">Reset</button>
                </div>
            </form>
        </>
    )
}
