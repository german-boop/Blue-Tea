"use client"
import React from 'react'
import { useContext } from 'react';
import { UserContext } from '@/utils/context/userProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { usePut } from '@/utils/hooks/useReactQueryPanel';
import { useForm } from 'react-hook-form';
import { userValidationSchema } from '@/validators/user';

export default function AccountDetail() {
    const { user } = useContext(UserContext);
    const userId = user?.id || user?._id;

    const router = useRouter()
    const fileInputRef = React.useRef(null);

    const { mutate: userMutate } = usePut("/users", {
        onSuccess: () => {
            toast.success("your Info updated Successfully :)")
            router.refresh()
        },
    })

    // React Hook Form setup
    const {
        register: formRegister,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(userValidationSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            avatar: null,
            password: "",
            newPassword: "",
            confirmPassword: ""
        }
    })

    const onSubmit = async (values) => {
        const data = new FormData();
        Object.entries(values).forEach(([key, val]) => {
            if (val !== null && val !== "") {
                data.append(key, val);
            }
            if (fileInputRef.current?.files?.[0]) {
                data.append("avatar", fileInputRef.current.files[0]);
            }
        });

        userMutate({ id: userId, payload: data })
    };

    return (
        <>
            <form
                className="row g-3"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                {/* Name & Email */}
                <div className="col-md-12">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        {...formRegister("name")}
                        required
                    />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        {...formRegister("email")}
                        required
                    />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        className="form-control"
                        {...formRegister("phone")}
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
                        ref={fileInputRef}
                    />
                </div>

                {/* Change Password */}
                <div className="col-md-4">
                    <label className="form-label">Old Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        {...formRegister("password")}

                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        className="form-control"
                        {...formRegister("newPassword")}

                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        {...formRegister("confirmPassword")}
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
