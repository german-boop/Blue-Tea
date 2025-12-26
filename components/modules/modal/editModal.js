import React, { useState } from 'react'
import styles from "./modal.module.css"
import { useRouter } from 'next/navigation'
import { usePut } from '@/utils/hooks/useReactQueryPanel'
import toast from 'react-hot-toast'

export default function EditModal({ title, item, setShowModal }) {
    const router = useRouter()
    const [form, setForm] = useState({
        name: item.name,
        price: item.price,
        description: item.description,
        size: item.size,
        category: item.category._id
    });
    const { mutate } = usePut(`/menu`, {
        onSuccess: () => {
            toast.success("menuItem Editted Successfully :)"),
                router.refresh()
        },
        onError: () => toast.error("Error updating article"),
    });

    const editHandeler = async (e) => {
        e.preventDefault();

        swal({
            title: "Are You Sure To Edit This item?",
            icon: "warning",
            buttons: ["No", "Yes"],
        }).then((result) => {
            if (!result) return;

            const formData = new FormData();
            const id = item._id
            formData.append("_id", id);
            formData.append("name", form.name);
            formData.append("price", form.price);
            formData.append("description", form.description);
            formData.append("size", form.size);
            formData.append("category", form.category);


            mutate({ id: id, payload: formData });
        });
    }


    return (
        <div className={`overlay ${styles.edit_modal__overlay}`}>
            <div className={styles.edit_modal}>
                <div className={styles.modal_header}>
                    <h3>{title}</h3>
                    <span className={styles.close_modal}>&times;</span>
                </div>
                <form className={styles.modal_form}>
                    <div className={styles.form_group}>
                        <label for="title">Title</label>
                        <input type="text"
                            defaultValue={item.name}
                            onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}

                            id="title" name="title"
                            placeholder="Enter title" />
                    </div>
                    <div className={styles.form_group}>
                        <label for="author">Price</label>
                        <input type="text" id="author"
                            onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}
                            defaultValue={item.price}
                            name="Price" placeholder="Price" />
                    </div>

                    <div className={styles.form_group}>
                        <label for="shortDesc">Short Description</label>
                        <textarea id="shortDesc"
                            name="shortDescription"
                            onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                            defaultValue={item.description}
                            placeholder="Short description"></textarea>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Size</label>
                        <input type="text"
                            onChange={(e) => setForm(prev => ({ ...prev, size: e.target.value }))}
                            defaultValue={item.size}
                            className="form-control" placeholder="M,L,S" />
                    </div>
                    <div className={styles.form_buttons}>
                        <button
                            onClick={(e) => editHandeler(e)}
                            className={styles.save_btn}>Save</button>
                        <button type="button"
                            onClick={() => setShowModal(false)}
                            className={styles.cancel_btn}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>

    )
}
