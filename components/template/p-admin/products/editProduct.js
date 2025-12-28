"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { productSchema } from '@/validators/product';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { usePut } from '@/utils/hooks/useReactQueryPanel';
import swal from 'sweetalert';

export default function EditProduct({ data, tree }) {
    const router = useRouter()
    const fileInputRef = React.useRef(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            price: "",
            shortDescription: "",
            longDescription: "",
            img: null,
            tags: "",
            category: "",
            isAvailable: false,
            size: ""
        },
    })


    // fill form with data
    useEffect(() => {
        if (!data) return
        setValue("name", data.name)
        setValue("price", data.price)
        setValue("shortDescription", data.shortDescription)
        setValue("longDescription", data.longDescription)
        setValue("tags", data.tags)
        setValue("category", data.category)
        setValue("size", data.size)
        setValue("isAvailable", data.isAvailable)

    }, [data, setValue])

    const { mutate } = usePut("/products", {
        onSuccess: () => {
            toast.success("Product Updated Successfully :)");
            router.push("/p-admin/products");
        },
        onError: () => toast.error("Error updating product"),
    });

    const onSubmit = (values) => {
        swal({
            title: "Are You Sure To Edit This item?",
            icon: "warning",
            buttons: ["No", "Yes"],
        }).then((result) => {
            if (!result) return;

            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("price", values.price);
            formData.append("shortDescription", values.shortDescription);
            formData.append("longDescription", values.longDescription);
            formData.append("variants", values.variants);
            formData.append("tags", values.tags);
            formData.append("category", values.category);
            formData.append("isAvailable", values.isAvailable);

            if (fileInputRef.current?.files?.[0]) {
                formData.append("img", fileInputRef.current.files[0]);
            }

            mutate({ id: data._id, payload: formData });
        });
    };

    return (
        <form className="row g-3"
            onSubmit={handleSubmit(onSubmit)}
            noValidate>
            <div className="col-md-6">
                <label className="form-label">Product Name</label>
                <input
                    type="text"
                    {...register("name")}
                    className="form-control"
                    required
                />
            </div>

            <div className="col-md-6">
                <label className="form-label">Price</label>
                <input
                    type="number"
                    {...register("price")}
                    className="form-control"
                    required
                />
            </div>

            <div className="col-12">
                <label className="form-label">Short Description</label>
                <input
                    type="text"
                    {...register("shortDescription")}
                    className="form-control"
                    required
                />
            </div>

            <div className="col-12">
                <label className="form-label">Long Description</label>
                <textarea
                    rows="4"
                    {...register("longDescription")}
                    className="form-control"
                    required
                ></textarea>
            </div>

            <div className="col-md-6">
                <label className="form-label">Image</label>
                <input
                    ref={fileInputRef}
                    type="file"
                    className="form-control"
                />
            </div>

            <div className="col-md-6">
                <label className="form-label">Category</label>
                <select
                    {...register("category")}
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
                    {...register("tags")}
                    className="form-control"
                    placeholder="organic, herbal-tea, relaxing, healthy"
                />
            </div>

            <div className="col-md-6">
                <label className="form-label">Variants</label>
                <input
                    type="text"
                    {...register("size")}
                    className="form-control"
                    placeholder="100g, 250g, 500g"
                />
            </div>

            <div className="col-2 d-flex align-items-center">
                <input
                    type="checkbox"
                    {...register("isAvailable")} />
                <span>Available</span>
            </div>

            <div className="col-12 d-flex gap-2 mt-5 justify-content-end">
                <button type='submit' className="edit">Edit</button>
                <button type="reset" className="remove">Reset</button>
            </div>
        </form>
    )
}
