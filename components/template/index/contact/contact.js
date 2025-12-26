import React from 'react'
import styles from "@/components/template/index/contact/contact.module.css"
import Link from 'next/link'

export default function Contact() {
    return (
        <section>
            <div className={styles.container}>
                <video
                    src="/downloaded-file (1).mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    width="100%"
                    height="100%"></video>
                <div className={styles.caption}>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ex voluptate temporibus ad, expedita eveniet voluptas quas ipsa numquam corporis?</span>
                    <Link href={"/contact-us"}>Contact Us</Link>
                </div>
            </div>
        </section>

    )
}
