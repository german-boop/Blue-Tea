"use client"
import React from 'react'
import { useState } from 'react'
import { usePost } from '@/utils/hooks/useReactQueryPublic'
import styles from "@/styles/contact-us.module.css"
import { showSwal } from '@/utils/helper'
export default function ContactForm() {
    const [email, setEmail] = useState("")
    const [company, setCompany] = useState("")
    const [phone, setPhone] = useState("")
    const [name, setName] = useState("")
    const [body, setBody] = useState("")

    const { mutate } = usePost("/contact", {
        onSuccess: () => {
            showSwal("your Message Sent Successfully :)","success","ok")
        },
    })

    const contactHandeler = async (e) => {
        e.preventDefault()
        mutate({ email, phone, name, company, body })
    }
    return (
        <div className={styles.form_group}>
            <div className={styles.contact_form}>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Your Name</label>
                        <input type="text"
                            onChange={(e) => setName(e.target.value)}

                            className="form-control" id="name"
                            placeholder="Enter your name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control" id="email"
                            placeholder="Enter your email" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="text"
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="email" placeholder="Enter your Phone Number" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="company"
                            className="form-label">Company</label>
                        <input type="text"
                            onChange={(e) => setCompany(e.target.value)}
                            className="form-control" id="email"
                            placeholder="Enter your Company Name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                            onChange={(e) => setBody(e.target.value)}
                            className="form-control" id="message" rows="5"
                            placeholder="Your message"></textarea>
                    </div>
                    <button onClick={(e) => contactHandeler(e)}
                        type="submit"
                        className={`${styles.btn}`}>Send Message</button>
                </form>
            </div>
        </div>
    )
}
