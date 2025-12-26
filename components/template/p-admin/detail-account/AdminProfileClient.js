"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { usePut } from "@/utils/hooks/useReactQueryPanel";
import { useRouter } from "next/navigation";

export default function AdminProfileClient({ adminData }) {
    const router = useRouter()
    const { mutate: userMutate } = usePut("/users", {
        onSuccess: () => {
            toast.success("user updated Successfully :)")
            router.refresh()
        },
        onError: () => toast.error("Error"),
    })

    const [formData, setFormData] = useState({
        name: adminData.name,
        email: adminData.email,
        phone: adminData.phone,
        avatar: null,
        password: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.entries(formData).forEach(([key, val]) => {
            if (val !== null) data.append(key, val);
        });

        userMutate({ id: adminData._id, payload: data })
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="row g-3">
                {/* Name & Email */}
                <div className="col-md-12">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Avatar */}
                <div className="col-md-12">
                    <label className="form-label">Profile Picture</label>
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>

                {/* Change Password */}
                <div className="col-md-4">
                    <label className="form-label">Old Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        className="form-control"
                        value={formData.newPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-12 d-flex gap-2 justify-content-end mt-3">
                    <button type="submit" className="edit">Save</button>
                    <button type="reset" className="remove">Reset</button>
                </div>
            </form>
        </>
    );
}
