"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { usePut } from '@/utils/hooks/useReactQueryPanel';
import swal from 'sweetalert';

export default function EditProduct({ data, tree }) {        
    const router = useRouter()
    const [form, setForm] = useState({
        name: "",
        price: "",
        shortDescription: "",
        longDescription: "",
        img: null,
        tags: "",
        category: "",
        isAvailable: false,
        size: ""
    });

    useEffect(() => {
        if (data) {
            setForm({
                name: data.name || "",
                price: data.price || "",
                shortDescription: data.shortDescription || "",
                longDescription: data.longDescription || "",
                img: data.img || null,
                tags: data.tags || "",
                category: data.category || "",
                isAvailable: data.isAvailable || false,
                size: data.size || ""
            });
        }
    }, [data]);

    const { mutate } = usePut("/products", {
        onSuccess: () => {
            toast.success("Product Updated Successfully :)");
            router.push("/p-admin/products");
        },
        onError: () => toast.error("Error updating product"),
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
            formData.append("name", form.name);
            formData.append("price", form.price);
            formData.append("shortDescription", form.shortDescription);
            formData.append("longDescription", form.longDescription);
            formData.append("variants", form.variants);
            formData.append("tags", form.tags);
            formData.append("category", form.category);            
            formData.append("isAvailable", form.isAvailable);
            if (form.img instanceof File) {
                formData.append("img", form.img);
            }

            mutate({ id: data._id, payload: formData });
        });
    };

    return (
        <form className="row g-3">
            <div className="col-md-6">
                <label className="form-label">Product Name</label>
                <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    className="form-control"
                    required
                />
            </div>

            <div className="col-md-6">
                <label className="form-label">Price</label>
                <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}
                    className="form-control"
                    required
                />
            </div>

            <div className="col-12">
                <label className="form-label">Short Description</label>
                <input
                    type="text"
                    value={form.shortDescription}
                    onChange={(e) => setForm(prev => ({ ...prev, shortDescription: e.target.value }))}
                    className="form-control"
                    required
                />
            </div>

            <div className="col-12">
                <label className="form-label">Long Description</label>
                <textarea
                    rows="4"
                    value={form.longDescription}
                    onChange={(e) => setForm(prev => ({ ...prev, longDescription: e.target.value }))}
                    className="form-control"
                    required
                ></textarea>
            </div>

            <div className="col-md-6">
                <label className="form-label">Image</label>
                <input
                    type="file"
                    onChange={(e) => setForm(prev => ({ ...prev, img: e.target.files[0] }))}
                    className="form-control"
                />
            </div>

            <div className="col-md-6">
                <label className="form-label">Category</label>
                <select
                    value={form.category}
                    onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                    className="form-select"
                    required>
                    <option value="" disabled>Select category</option>
                    {tree.map(cat =>
                        cat.slug === "shop" && cat.children.map(item => (
                            <option value={item._id} key={item._id}>{item.name}</option>
                        ))
                    )}
                </select>
            </div>

            <div className="col-md-6">
                <label className="form-label">Tags</label>
                <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => setForm(prev => ({ ...prev, tags: e.target.value }))}
                    className="form-control"
                    placeholder="organic, herbal-tea, relaxing, healthy"
                />
            </div>

            <div className="col-md-6">
                <label className="form-label">Variants</label>
                <input
                    type="text"
                    value={form.size}
                    onChange={(e) => setForm(prev => ({ ...prev, size: e.target.value }))}
                    className="form-control"
                    placeholder="100g, 250g, 500g"
                />
            </div>

            <div className="col-2 d-flex align-items-center">
                <input
                    type="checkbox"
                    checked={form.isAvailable}
                    onChange={(e) => setForm(prev => ({ ...prev, isAvailable: e.target.checked }))} />
                <span>Available</span>
            </div>

            <div className="col-12 d-flex gap-2 mt-5 justify-content-end">
                <button onClick={handleEdit} className="edit">Edit</button>
                <button type="reset" className="remove">Reset</button>
            </div>
        </form>
    )
}
