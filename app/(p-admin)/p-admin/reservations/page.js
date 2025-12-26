import React from 'react'
import Table from '@/components/modules/table/Table'
import connectToDB from '@/db/db'
import { FaRegEdit } from "react-icons/fa";
import Pagination from '@/components/modules/pagination/pagination'
import reservationModal from '@/model/reservation';

export default async function page({ searchParams }) {
    connectToDB()
    const searchparams = await searchParams

    const page = Number(searchparams.page) || 1;
    const limit = Number(searchparams.limit) || 15;

    const skip = (page - 1) * limit;
    const totalCount = await reservationModal.countDocuments();

    const reservations = await reservationModal.find({})
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
                        <th>Date</th>
                        <th>Time</th>
                        <th>Guests</th>
                        <th>Notes</th>
                        <th>Status</th>
                        <th><FaRegEdit /></th>
                    </tr>
                </thead>
                <tbody>
                    {JSON.parse(JSON.stringify(reservations)).map((r, index) => (
                        <tr key={index + 1}>
                            <td className="number">
                                <span>{index + 1}</span></td>
                            <td>{r.name}</td>
                            <td>{r.email}</td>
                            <td> {r.phone}</td>
                            <td>{r.date?.slice(0, 10)}</td>
                            <td>{r.time}</td>
                            <td>{r.guests}</td>
                            <td>
                                <button
                                   className="classic">
                                    Content
                                </button>
                            </td>
                            <td>{r.status}</td>

                            <td className="btn">
                                <button
                                    className='edit'>
                                    Edit
                                </button>
                                <button
                                    className='remove'>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination
                href={`reservations?`}
                currentPage={page}
                pageCount={Math.ceil(totalCount / limit)}
                limit={limit}
            />
        </>
    )

}
