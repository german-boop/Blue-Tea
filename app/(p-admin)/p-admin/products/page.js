import React from 'react'
import Table from '@/components/modules/table/Table'
import connectToDB from '@/db/db'
import ProductModal from '@/model/product'
import ProductList from '@/components/template/p-admin/products/productList'
import Image from 'next/image'
import { FaRegEdit } from "react-icons/fa";
import Pagination from '@/components/modules/pagination/pagination'

export default async function page({ searchParams }) {
    connectToDB()
    const searchparams = await searchParams

    const page = Number(searchparams.page) || 1;
    const limit = Number(searchparams.limit) || 15;

    let cursor = null

    if (page > 1) {
        const productPrev = await ProductModal
            .find({})
            .sort({ _id: 1 })
            .limit((page - 1) * limit)
            .select("_id")
            .populate("category")
            .lean();

        cursor = productPrev[productPrev.length - 1]?._id
    }
    const query = cursor ? { _id: { $gt: cursor } } : {};
    const totalCount = await ProductModal.countDocuments();

    const products = await ProductModal
        .find(query)
        .sort({ _id: 1 })
        .limit(limit)
        .populate("category")
        .lean();

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Score</th>
                        <th>Category</th>
                        <th>Available</th>
                        <th><FaRegEdit /></th>
                    </tr>
                </thead>
                <ProductList data={JSON.parse(JSON.stringify(products))} />
            </Table>
            <Pagination
                href={`products?`}
                currentPage={page}
                pageCount={Math.ceil(totalCount / limit)}
                limit={limit}
            />
        </>
    )

}
