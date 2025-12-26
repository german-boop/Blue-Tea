"use client"
import React, { useState } from 'react'
import styles from "@/styles/login-register.module.css"
import Modal from '@/components/modules/modal/editModal'
import { useMutation } from '@tanstack/react-query'
import { manageError } from '@/utils/helper'
import axios from 'axios'

export default function Register({ showloginForm }) {
    const [showSuccess, setShowSuccess] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")

    const mutation = useMutation({
        mutationFn: async (data) => {
            const res = await axios.post("/api/auth/signup", data);
            return res.data;
        },
        onSuccess: () => setShowSuccess(true),
        onError: (error) => {
            const status = error.response?.status
            manageError(status)
        }
    });

    const register = (e) => {
        e.preventDefault()
        const user = { name, phone, email, password }
        mutation.mutate(user)
    }

    return (
        <>
            <div className={styles.login_container}>
                <div className={styles.login_card}>
                    <div className={styles.login_header}>
                        <h2>Welcome Back</h2>
                        <p>Sign in to your account</p>
                    </div>

                    <form className={styles.login_form} id="loginForm">
                        <div className={styles.form_group}>
                            <div className={styles.input_wrapper}>
                                <input type="text" id="name" name="name"
                                    required autoComplete="name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label htmlFor="name">Name</label>
                                <span className={styles.focus_border}></span>
                            </div>
                        </div>

                        <div className={styles.form_group}>
                            <div className={styles.input_wrapper}>
                                <input type="email" id="email" name="email"
                                    required autoComplete="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="email">Email Address</label>
                                <span className={styles.focus_border}></span>
                            </div>
                        </div>

                        <div className={styles.form_group}>
                            <div className={styles.input_wrapper}>
                                <input type="password" id="password" name="password"
                                    required autoComplete="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label htmlFor="password">Password</label>
                                <span className={styles.focus_border}></span>
                            </div>
                        </div>

                        <div className={styles.form_group}>
                            <div className={styles.input_wrapper}>
                                <input type="text" id="phone" name="phone"
                                    required autoComplete="phone"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <label htmlFor="phone">Phone</label>
                                <span className={styles.focus_border}></span>
                            </div>
                        </div>

                        <button
                            onClick={register}
                            type="submit" className={`${styles.login_btn} ${styles.btn}`}>
                            <span className={styles.btn_text}>Sign Up</span>
                            <span className={styles.btn_loader}></span>
                        </button>
                    </form>

                    <div className={styles.divider}>
                        <span>or continue with</span>
                    </div>

                    <div className={styles.social_login}>
                        <button type="button" className={`${styles.social_btn} ${styles.google_btn}`}>
                            <span className={`${styles.social_icon} ${styles.google_icon}`}></span>
                            Google
                        </button>
                        <button type="button" className={`${styles.social_btn} ${styles.github_btn}`}>
                            <span className={`${styles.social_icon} ${styles.github_icon}`}></span>
                            GitHub
                        </button>
                    </div>

                    <div className={styles.signup_link}>
                        <p>Dont have an account?
                            <span onClick={showloginForm}>Sign In</span>
                        </p>
                    </div>
                </div>
            </div>

            {showSuccess &&
                <Modal
                    icon="success"
                    title="You Are Logged In Successfully"
                    href="/" />}
        </>
    )
}
