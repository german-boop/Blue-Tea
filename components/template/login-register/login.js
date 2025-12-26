"use client"
import React from 'react'
import styles from "@/styles/login-register.module.css"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { showSwal } from '@/utils/helper'
import axios from 'axios'
import { manageError } from '@/utils/helper'
export default function Login({ showRegisterForm }) {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const mutation = useMutation({
        mutationFn: async (data) => {
            const res = await axios.post("/api/auth/signin", data);
            return res.data;
        },
        onSuccess: () => {
            showSwal("LogIn Successfully :)", "success", "ok")
            router.push("/")
        },
        onError: (error) => {
            const status = error.response?.status
            manageError(status)
        },


    });
    const LogIn = async (e) => {
        e.preventDefault()
        const user = {
            identifier: email,
            password
        }
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
                    <form className={styles.login_form}
                        id="loginForm"
                        noValidate>
                        <div className={styles.form_group}>
                            <div className={styles.input_wrapper}>
                                <input type="email"
                                    id="email"
                                    name="email"
                                    required autoComplete="email"
                                    onChange={(e) => setEmail(e.target.value)}

                                />
                                <label htmlFor="email">Email Address</label>
                                <span className={styles.focus_border}></span>
                            </div>
                        </div>

                        <div className={styles.form_group}>
                            <div className={styles.input_wrapper}>
                                <input type="password" id="password"
                                    name="password"
                                    required autoComplete="password"
                                    onChange={(e) => setPassword(e.target.value)}

                                />
                                <label htmlFor="password">Password</label>
                                <span className={styles.focus_border}></span>
                            </div>
                        </div>
                        <div className={styles.form_options}>
                            <div className={styles.remember_wrapper}>
                                <input type="checkbox"
                                    id="remember" name="remember" />
                                <span className={styles.checkbox_label}>
                                    Remember me
                                </span>
                            </div>
                            <a href="#" className={styles.forgot_password}>Forgot password?</a>
                        </div>

                        <button
                            onClick={(e) => LogIn(e)}
                            type="submit" className={`${styles.login_btn} ${styles.btn}`}>
                            <span
                                className={styles.btn_text}>LogIn</span>
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
                            <span onClick={() => showRegisterForm()}>Sign up</span></p>
                    </div>


                </div>
            </div>
        </>
    )
}
