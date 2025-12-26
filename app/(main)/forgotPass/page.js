"use client"
import React from 'react'
import styles from "@/styles/login-register.module.css"
import { usePost } from '@/utils/hooks/useReactQueryPanel'
import { useState } from 'react'
import Modal from '@/components/modules/modal/editModal'
import { showSwal } from '@/utils/helper'
import Footer from '@/components/modules/footer/footer'
export default function ForgotPass() {
    const [showSuccss, setShowSuccess] = useState(false)

    const [email, setEmail] = useState("")
    const [newPassword, setPassword] = useState("")
    const [resetCode, setResetCode] = useState("")

    const [isShowPassword, setIsShowPassword] = useState(false)

    const { mutate: sendResetCode } = usePost("/auth/forgotPass", {
        onSuccess: () => {
            showSwal("Your Code sent Scccessfully :)", "success", "ok")
            setIsShowPassword(true)
        }
    });

    const { mutate: resetPassword } = usePost("/auth/reset-pass", {
        onSuccess: () => setShowSuccess(true)
    });


    const forgotPassHandeler = async (e) => {
        e.preventDefault()
        sendResetCode({ email })
    }

    const changePaasword = async (e) => {
        e.preventDefault()
        resetPassword({
            email,
            resetCode,
            newPassword
        })
    }

    return (
        <>
            <div className={styles.login_container}>
                <div className={styles.login_card}>
                    <div className={styles.login_header}>
                        <h2>Welcome Back</h2>
                        <p>Sign in to your account</p>
                    </div>
                    {!isShowPassword ?
                        <form className={styles.login_form}
                            noValidate>
                            <div className={styles.form_group}>
                                <div className={styles.input_wrapper}>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        autoComplete="email"
                                        onChange={(e) => setEmail(e.target.value)} />
                                    <label htmlFor="email">Email Address</label>
                                    <span className={styles.focus_border}></span>
                                </div>
                            </div>
                            <button
                                onClick={(e) => forgotPassHandeler(e)}
                                type="submit" className={`${styles.login_btn} ${styles.btn}`}>
                                <span
                                    className={styles.btn_text}>Send Email</span>
                                <span className={styles.btn_loader}></span>
                            </button>
                        </form> :
                        <form>
                            <div className={styles.form_group}>
                                <div className={styles.input_wrapper}>
                                    <input
                                        type="password"
                                        id=""
                                        name="Code"
                                        required
                                        autoComplete="Code"
                                        onChange={(e) => setResetCode(e.target.value)}
                                    />
                                    <label htmlFor="password">Reset Code</label>
                                    <span className={styles.focus_border}></span>
                                </div>
                            </div>
                            <div className={styles.form_group}>
                                <div className={styles.input_wrapper}>
                                    <input type="password"
                                        id=""
                                        name="password"
                                        required
                                        autoComplete="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label htmlFor="password">New Password</label>
                                    <span className={styles.focus_border}></span>
                                </div>
                            </div>
                            <button
                                onClick={(e) => changePaasword(e)}
                                type="submit"
                                className={`${styles.login_btn} ${styles.btn}`}>
                                <span
                                    className={styles.btn_text}>Reset Password</span>
                                <span className={styles.btn_loader}></span>
                            </button>
                        </form>}
                </div>
            </div>
            {showSuccss &&
                <Modal
                    icon="success"
                    title="Your Password Changed Successfully"
                    href="/login-register" />}

            <Footer />
        </>
    )
}
