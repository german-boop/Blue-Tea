import React from 'react'
import Table from '@/components/modules/table/Table'
import connectToDB from '@/db/db'
import { FaRegEdit } from "react-icons/fa";
import Pagination from '@/components/modules/pagination/pagination'
import menuItemModel from '@/model/menuItem'
import MenuList from '@/components/template/p-admin/menu/menuList';


export default async function page({ searchParams }) {
    connectToDB()
    const searchparams = await searchParams
    const page = Number(searchparams.page) || 1;
    const limit = Number(searchparams.limit) || 20;

    let cursor = null

    if (page > 1) {
        const menuItemsPrev = await menuItemModel
            .find({})
            .sort({ _id: 1 })
            .limit((page - 1) * limit)
            .select("_id")
            .populate("category")
            .lean();

        cursor = menuItemsPrev[menuItemsPrev.length - 1]?._id
    }

    const query = cursor ? { _id: { $gt: cursor } } : {};
    const totalCount = await menuItemModel.countDocuments();

    const menuItems = await menuItemModel
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
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th><FaRegEdit /></th>
                    </tr>
                </thead>
                <MenuList data={JSON.parse(JSON.stringify(menuItems))} />
            </Table>
            <Pagination
                href={`menu?`}
                currentPage={page}
                pageCount={Math.ceil(totalCount / limit)}
                limit={limit}
            />
        </>
    )

}
