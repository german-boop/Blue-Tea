import React from 'react'
import Table from '@/components/modules/table/Table'
import connectToDB from '@/db/db'
import { FaRegEdit } from "react-icons/fa";
import Pagination from '@/components/modules/pagination/pagination'
import UserModal from '@/model/user'


export default async function page({ searchParams }) {
    connectToDB()
    const searchparams = await searchParams

    const page = Number(searchparams.page) || 1;
    const limit = Number(searchparams.limit) || 15;

    const skip = (page - 1) * limit;
    const totalCount = await UserModal.countDocuments();

    const users = await UserModal.find()
        .skip(skip)
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
                        <th>Role</th>
                        <th><FaRegEdit /></th>
                    </tr>
                </thead>
                <tbody>
                    {JSON.parse(JSON.stringify(users)).map((u, index) => (
                        <tr key={index + 1}>
                            <td className="number">
                                <span>{index + 1}</span></td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td> {u.phone}</td>
                            <td>{u.role}</td>
                            <td className="btn">
                                <button className='remove'>
                                    Ban
                                </button>
                                <button className='edit'>
                                    Edit
                                </button>
                                <button className='remove'>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination
                href={`users?`}
                currentPage={page}
                pageCount={Math.ceil(totalCount / limit)}
                limit={limit}
            />
        </>
    )

}
