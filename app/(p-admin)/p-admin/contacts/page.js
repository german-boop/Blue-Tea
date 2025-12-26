import React from 'react'
import Table from '@/components/modules/table/Table'
import connectToDB from '@/db/db'
import { FaRegEdit } from "react-icons/fa";
import Pagination from '@/components/modules/pagination/pagination'
import contactModel from '@/model/contact';
import ContactsList from '@/components/template/p-admin/contacts/contactsList';

export default async function page({ searchParams }) {
    connectToDB()
    const searchparams = await searchParams

    const page = Number(searchparams.page) || 1;
    const limit = Number(searchparams.limit) || 15;
    let cursor = null
    if (page > 1) {
        const prevContacts = await contactModel
            .find({})
            .sort({ _id: 1 })
            .limit((page - 1) * limit)
            .select("_id")

        cursor = prevContacts[prevContacts.length - 1]?._id
    }
    const query = cursor ? { _id: { $gt: cursor } } : {};

    const totalCount = await contactModel.countDocuments();

    const contacts = await contactModel
        .find(query)
        .sort({ _id: 1 })
        .limit(limit)
        .lean();

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>CreatedAT</th>
                        <th>Content</th>
                        <th><FaRegEdit /></th>
                    </tr>
                </thead>
                <ContactsList
                    data={JSON.parse(JSON.stringify(contacts))} />
            </Table>
            <Pagination
                href={`contacts?`}
                currentPage={page}
                pageCount={Math.ceil(totalCount / limit)}
                limit={limit}
            />
        </>
    )

}
