"use client"
import React from 'react'
import Image from 'next/image'
import styles from "./banner.module.css"
import { motion } from "framer-motion";
import { AnimatePresence, easeInOut } from 'framer-motion';
import { useState } from "react";
import Link from 'next/link';

export default function Banner() {
    const data = [
        "/71SmJH0kFLL._SX679_PIbundle-3_TopRight_0_0_AA679SH20_-removebg-preview.png",
        "/1380320d-fd67-443b-8079-a55c0ed89ac0_removalai_preview.png",
        "/71Juj7X3KkL._SX679_-removebg-preview.png",
    ];
    const [index, setIndex] = useState(0);

    const handleClick = (index) => {
        setIndex(prev => prev = index);
    };

    return (
        <div className={`container-fluid ${styles.container_banner}`}>
            <div className="row align-items-center justify-content-between p-5">
                <div className="col-lg-5">
                    <AnimatePresence>
                        <motion.div
                            key={index}
                            initial={{ opacity: 0.6, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className={`d-flex flex-column gap-1 align-items-center ${styles.caption_container}`}>
                            <div className="d-flex flex-column gap-3 align-items-center text-center px-3">
                                <p className="mb-1 text-white">Welcome to <strong>BLUE TEA</strong></p>
                                <h1 className="display-2 text-white fw-bold mb-3">
                                    Sip. Shop. Savor.
                                </h1>
                                <p className="text-white lead mb-4">
                                    Experience the perfect blend of a cozy coffee shop and a curated store. From freshly brewed coffee and soothing teas to herbal blends and unique shop finds,
                                    <span className='fw-bold'>BLUE TEA</span> is your destination for flavor, relaxation, and discovery.
                                </p>
                                <div className="d-flex gap-3">
                                    <Link href="/products" className={`btn btn-light py-3 px-5 ${styles.btn}`}>
                                        Explore Our Shop
                                    </Link>
                                    <Link href="#menu"
                                        className={`btn btn-outline-light py-3 px-5 ${styles.btn}`}>
                                        View Menu
                                    </Link>
                                </div>
                            </div>
                            <div className='row justify-content-center gap-2'>
                                {data.map((item, index) => {
                                    return (
                                        <div
                                            key={index + 1}
                                            onClick={() => handleClick(index)}
                                            className="col-3">
                                            <Image
                                                className={styles.img_slide}
                                                width={100}
                                                height={100}
                                                src={item}
                                                alt="" />
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className={`col-lg-5 ${styles.img_container}`}>
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={index}
                            initial={{ opacity: 0, scale: 0.9, y: 100 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2, easeInOut }}
                            exit={{
                                opacity: 0,
                                scale: 0.9,
                                y: 100,
                                transition: {
                                    duration: 0.2,
                                },
                            }}
                            src={data[index]}
                            alt="" />
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}




