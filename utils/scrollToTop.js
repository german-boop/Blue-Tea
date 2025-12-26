"use client";
import { useEffect, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        return window.addEventListener("scroll", () => {
            window.scrollY > 120 ? setIsVisible(true) : setIsVisible(false);
        });

    }, []);

    const scrollToTop = () => {
        isVisible &&
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
    };

    return (
        <button
            className={isVisible ? "buttonVisible" : "button"}
            onClick={scrollToTop}>
            <MdKeyboardArrowUp />
        </button>
    );
};

export default ScrollToTop;
