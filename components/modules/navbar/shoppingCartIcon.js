"use client"
import React from 'react'
import CartContext from '@/utils/context/cartProvider';
import { useContext } from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from 'next/link';
export default function ShoppingCartIcon() {
    const { cart } = useContext(CartContext)
    return (

        <Link href="/cart" className="position-relative">
            <AiOutlineShoppingCart color='#000' size={24} />
            <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                style={{ fontSize: "0.75rem", backgroundColor: "var(--brown-light)" }} >
                {cart.length}
            </span>
        </Link>

    )
}
