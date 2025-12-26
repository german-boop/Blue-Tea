import Table from '@/components/modules/table/Table'
import connectToDB from '@/db/db'
import { FaRegEdit } from "react-icons/fa";
import Pagination from '@/components/modules/pagination/pagination'
import commentModel from '@/model/comment';
import CommentsList from '@/components/template/p-admin/comments/commentsList';


export default async function page({ searchParams }) {
    connectToDB()
    const searchparams = await searchParams

    const page = Number(searchparams.page) || 1;
    const limit = Number(searchparams.limit) || 15;

    let cursor = null
    if (page > 1) {
        const commentsPrev = await commentModel
            .find({})
            .sort({ _id: 1 })
            .limit((page - 1) * limit)
            .select("_id")
            .lean();

        cursor = commentsPrev[commentsPrev.length - 1]?._id
    }
    const query = cursor ? { _id: { $gt: cursor } } : {};
    const totalCount = await commentModel.countDocuments();

    const comments = await commentModel
        .find(query)
        .sort({ _id: 1 })
        .limit(limit)
        .populate("productID")
        .lean();
        
    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Score</th>
                        <th>CreatedAT</th>
                        <th>ProductName</th>
                        <th>Content</th>
                        <th><FaRegEdit /></th>
                    </tr>
                </thead>
                <CommentsList data={JSON.parse(JSON.stringify(comments))} />
            </Table>
            <Pagination
                href={`comments?`}
                currentPage={page}
                pageCount={Math.ceil(totalCount / limit)}
                limit={limit}
            />
        </>
    )

}
