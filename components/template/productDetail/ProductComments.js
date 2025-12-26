import CommentForm from './commentForm'
import styles from "./productComments.module.css"
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import Pagination from '@/components/modules/pagination/pagination';

export default function ProductComments({ productID, comments,page,totalCount,limit }) {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <h3 className={styles.title}>Reviews</h3>
                    {/* Example review */}
                    {comments?.length ? comments.map((c, index) => (
                        <div key={index + 1} className={styles.card}>
                            <div className="d-flex align-items-center mb-2 justify-content-between">
                                <div>
                                    <span>{c.username}</span>
                                    <span className='ms-3'>{c.date.slice(0, 10)}</span>
                                </div>
                                <div className={styles.stars}>
                                    {new Array(c.score).fill(0).map((item, index) => (
                                        <FaStar key={index} />
                                    ))}
                                    {new Array(5 - c.score).fill(0).map((item, index) => (
                                        <FaRegStar key={index} />
                                    ))}
                                </div>
                            </div>
                            <p>{c.body}</p>
                        </div>
                    )) : null}
                    <hr />
                    <Pagination
                        href={`/products/${productID}?`}
                        currentPage={page}
                        pageCount={Math.ceil(totalCount / limit)}
                        limit={limit}
                    />
                    {/* Comment form */}
                    <CommentForm
                        productID={productID} />
                </div>
            </div>
        </div>

    )
}
