import React from 'react'
import styles from "./menu.module.css"

export default function MenuItem({ products, catId }) {
    return (
        <>
            {products.filter(item => item.category._id.toString() === catId.toString()).map((pro, index) => (
                <div
                    key={index + 1}
                    className={styles.menu_block}>
                    <div className="d-flex">
                        <h6>{pro.name}</h6>
                        <span className="underline"></span>
                        <strong className="ms-auto"> $ {pro.price}</strong>
                    </div>
                    <div className="pt-1">
                        <small>{pro.description}</small>
                    </div>
                </div>
            ))}
        </>
    )
}
