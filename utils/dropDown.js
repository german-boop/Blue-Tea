"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "@/components/modules/p-admin/sidebar.module.css"

export default function Dropdown({ icon, title, items }) {
    const [open, setOpen] = useState(false);

    return (
        <li className={styles.sidebar_item}>
            <div onClick={() => setOpen(!open)} className={`${styles.sidebar_link} cursor-pointer}`}>
                <i className={`me-2 bi ${icon}`}></i>
                <span>{title}</span>
                <i className="ms-auto bi bi-chevron-down"></i>
            </div>

            {open && (
                <ul className={styles.submenu}>
                    {items.map((item) => (
                        <li key={item.href} className={styles.submenu_item}>
                            <Link href={item.href}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}
