import React from 'react'
import Table from '@/components/modules/table/Table'
import connectToDB from '@/db/db'
import ArticleModel from '@/model/article'
import { FaRegEdit } from "react-icons/fa";
import Pagination from '@/components/modules/pagination/pagination'
import ArticlesList from '@/components/template/p-admin/articles/articlesList'


export default async function page({ searchParams }) {
    connectToDB()
    const searchparams = await searchParams
    const page = Number(searchparams.page) || 1;
    const limit = Number(searchparams.limit) || 20;

    let cursor = null

    if (page > 1) {
        const prevarticles = await ArticleModel
            .find({})
            .sort({ _id: 1 })
            .limit((page - 1) * limit)
            .select("_id")

        cursor = prevarticles[prevarticles.length - 1]?._id
    }
    const query = cursor ? { _id: { $gt: cursor } } : {};
    const totalCount = await ArticleModel.countDocuments();

    const articles = await ArticleModel
        .find(query)
        .sort({ _id: 1 })
        .limit(limit)
        .lean();

    return (
        <>
            <Table title={"Latest Articles"}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>shortDescription</th>
                        <th>Status</th>
                        <th><FaRegEdit /></th>
                    </tr>
                </thead>
                <ArticlesList
                    data={JSON.parse(JSON.stringify(articles))} />
            </Table>
            <Pagination
                href={`articles?`}
                currentPage={page}
                pageCount={Math.ceil(totalCount / limit)}
                limit={limit}
            />
        </>
    )

}
