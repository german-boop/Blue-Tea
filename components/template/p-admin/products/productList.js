"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDelete } from '@/utils/hooks/useReactQueryPanel'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function ProductList({ data }) {
    const router = useRouter()

    const { mutate } = useDelete(`/products`, {
        onSuccess: (data) => {
            toast.success("Item Removed Successfully :)")
            router.refresh()
        },
        onError: (err) => {
            toast.error("Error creating order");
        },
    })

    const removeProduct = (id) => {
        swal({
            title: "Are You Sure To remove This item?",
            icon: "warning",
            buttons: ["No", "yes"]
        }).then(result => {
            if (result) {
                mutate(id)
            }
        })
    }

    return (
        <tbody>
            {data.map((p, index) => (
                <tr key={index + 1}>
                    <td className="number">
                        <span>{index + 1}</span></td>
                    <td>
                        <Image
                            width={50}
                            height={50}
                            src={p.img} alt=''
                            className='mx-1' />
                        {p.name}
                    </td>
                    <td>{p.shortDescription}</td>
                    <td> $ {p.price}</td>
                    <td>{p.score}</td>
                    <td>{p.category.name}</td>
                    <td>{p.isAvailable === true ? "In Stock" : "Out Of Stock"}</td>
                    <td className="btn">
                        <button
                            onClick={() => removeProduct(p._id)}
                            className='remove'>
                            Remove
                        </button>
                           <Link
                                href={`/p-admin/products/${p._id}`}
                                className='edit'>
                                Edit
                            </Link>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}
