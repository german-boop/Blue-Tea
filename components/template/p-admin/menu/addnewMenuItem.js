"use client"
import React, { useEffect, useRef } from 'react'
import { NewMenuItem } from '@/utils/actions/menuItemServerAction';
import { useActionState } from "react";
import toast from 'react-hot-toast';
export default function AddnewMenuItem({ tree }) {
    const formRef = useRef(null);
    const [state, formAction] = useActionState(NewMenuItem, {
        status: null,
        message: null,
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
        if (state?.status === 201 || state.status === 200) {
            toast.success("menuItem added Successfully :)")
             formRef.current?.reset();
        }
    }, [state.status]);


    return (
        <div className="transparentCard">
            <form
                ref={formRef}
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
                    {state?.errors?.name && (
                        <span className="text-sm text-red-500">{state.errors.name[0]}</span>
                    )}
                </div>

                <div className="col-md-6">
                    <label className="form-label">Price</label>
                    <input type="number"
                        name='price'
                        className="form-control" required />
                    {state?.errors?.price && (
                        <span className="text-sm text-red-500">{state.errors.price[0]}</span>
                    )}
                </div>

                <div className="col-12">
                    <label className="form-label">Description</label>
                    <input type="text"
                        name="description"
                        lassName="form-control" required />
                    {state?.errors?.description && (
                        <span className="text-sm text-red-500">{state.errors.description[0]}</span>
                    )}
                </div>

                <div className="col-md-6">
                    <label className="form-label">Category</label>
                    <select
                        className="form-select"
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
                    {state?.errors?.category && (
                        <span className="text-sm text-red-500">{state.errors.category[0]}</span>
                    )}
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
                    {state?.errors?.size && (
                        <span className="text-sm text-red-500">{state.errors.size[0]}</span>
                    )}
                </div>
                <div className="col-12 d-flex gap-2 mt-5 justify-content-end">
                    <button type="submit" className="edit">Create</button>
                    <button type="reset" className="remove">Reset</button>
                </div>
            </form>
        </div>
    )
}
