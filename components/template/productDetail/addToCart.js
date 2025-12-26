"use client"
import React from 'react'
import useBasket from '@/utils/hooks/useBasket'

export default function AddToCart({ productID, img, name, price }) {
    const {
        addToBasket,
        count,
        increaseCount,
        decreaseCount,
    } = useBasket()


    return (
        <div className="d-flex align-items-center gap-3">
            <span
                className="form-label text-white">Quantity:</span>
            <div className="d-flex align-items-center gap-2">
                <button
                    onClick={()=>decreaseCount(productID)}
                   className="classic btn-sm">
                    −
                </button>
                <span className="fw-bold  text-white">{count}</span>
                <button
                    onClick={()=>increaseCount(productID)}
                   className="classic btn-sm">
                    +
                </button>
            </div>
            <button onClick={() => addToBasket(productID, img, name, price,count)} className="btn mt-3">Add to Cart</button>
        </div>
    )
}
