import React from 'react'
import styles from "@/components/modules/footer/footer.module.css"
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (

        <footer className={styles.site_footer}>
            <div className="container">
                <div className="row">

                    <div className="col-lg-4 col-12 me-auto">
                        <em className="text-white d-block mb-4">Where to find us?</em>

                        <strong className="text-white">
                            <i className="bi-geo-alt me-2"></i>
                            Bandra West, Mumbai, Maharashtra 400050, India
                        </strong>

                        <ul className="social-icon mt-4">
                            <li className={styles.social_icon__item}>
                                <IoLogoWhatsapp />
                            </li>
                            <li className={styles.social_icon__item}>
                                <FaTwitter />
                            </li>
                            <li className={styles.social_icon__item}>
                                <FaFacebook />
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-12 mt-4 mb-3 mt-lg-0 mb-lg-0">
                        <em className="text-white d-block mb-4">Contact</em>

                        <p className="d-flex mb-1">
                            <strong className="me-2">Phone:</strong>
                            <a href="tel: 305-240-9671" className={styles.site_footer__link}>
                                (65)
                                305 2409 671
                            </a>
                        </p>

                        <p className="d-flex">
                            <strong className="me-2">Email:</strong>
                            <a href="mailto:info@yourgmail.com"
                                className={styles.site_footer__link}>
                                hello@barista.co
                            </a>
                        </p>
                    </div>

                    <div className="col-lg-5 col-12">
                        <em className="text-white d-block mb-4">Opening Hours.</em>
                        <ul className={styles.opening_hours__list}>
                            <li className="d-flex p-2 text-white">
                                Monday - Friday :
                                <span className=" pe-1"></span>

                                <strong>9:00 - 18:00</strong>
                            </li>

                            <li className="d-flex p-2 text-white">
                                Saturday :
                                <span className="pe-1"></span>

                                <strong>11:00 - 16:30</strong>
                            </li>

                            <li className="d-flex p-2 text-white">
                                Sunday :
                                <span className=" pe-1"></span>
                                <strong>Closed</strong>
                            </li>
                        </ul>
                    </div>

                </div>
            </div></footer>
    )
}
