"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { NewMenuItem } from '@/utils/useServerAction';
import { useActionState } from "react";
import swal from 'sweetalert';
export default function AddnewMenuItem({ tree }) {
    console.log(tree);

    const router = useRouter();
    const [category, setCategory] = useState("");
    const [state, formAction] = useActionState(NewMenuItem, {
        message: "",
        error: undefined,
        fields: {
            name: "",
            price: "",
            description: "",
            size: "",
            category: "",
            image: "",
        }
    });

    useEffect(() => {
        if (state.message === "success") {
            swal({
                title: "menuItem added Successfully :)",
                icon: "success",
                buttons: "ok",
            }).then(() => router.replace("/p-admin/menu"));
        } else if (state.message === "error") {
            swal({
                title: "Please fill out required fields :(",
                icon: "warning",
                buttons: "ok",
            });
        }
    }, [state.message]);
    return (
        <div className="transparentCard">
            <form
                action={async (formData) => {
                    await formAction(formData);
                }}
                className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input type="text"
                        name='name'
                        className="form-control"
                        required />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Price</label>
                    <input type="number"
                        name='price'
                        className="form-control" required />
                </div>

                <div className="col-12">
                    <label className="form-label">Description</label>
                    <input type="text"
                        name="description"
                        lassName="form-control" required />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Category</label>
                    <select
                        className="form-select"
                        onChange={(e) => setCategory(e.target.value)}
                        name='category'
                        required>
                        <option disabled>Select category</option>
                        {tree.map((cat, index) => (
                            cat.slug === "menu" &&
                            cat.children.map(item => (
                                <option
                                    value={item._id}
                                    key={item._id}>
                                    {item.name}</option>
                            ))
                        ))}
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Cover Image</label>
                    <input
                        type="file"
                        name="image"
                        className="form-control"
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Size</label>
                    <input type="text"
                        name='size'
                        className="form-control"
                        placeholder="M,L,S" />
                </div>
                <div className="col-12 d-flex gap-2 mt-5 justify-content-end">
                    <button type="submit" className="edit">Create</button>
                    <button type="reset" className="remove">Reset</button>
                </div>
            </form>
        </div>
    )
}
