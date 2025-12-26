import React from 'react'
import styles from "@/components/modules/table/table.module.css"


export default function Table({ children, title }) {
    return (
        <div className="col-xl-12">
            <div className="card-header mb-1"
                style={{ border: "none" }}>
                <h5 className="fw-bold mb-3 text-white">{title}</h5>
            </div>
            <div className={`card ${styles.transparentCard}`}>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className={styles.transparentTable}>
                            {children}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
