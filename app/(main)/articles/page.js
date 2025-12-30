import React from 'react'
import connectToDB from '@/db/db'
import ArticleModel from '@/model/article'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/components/template/index/articles/articles.module.css';
import { paginate } from '@/utils/helper'
export default async function page({ searchParams }) {
    await connectToDB()
    const searchparams = await searchParams
    const paginatedData = await paginate(ArticleModel, searchparams, {}, null, true, false)

    return (
        <div className="py-5">
            <div className="header mb-5">
                <h1 className="text-white">Our Article</h1>
            </div>
            <div className="container">
                <div className="row gap-5 align-items-center justify-content-center">
                    {paginatedData.data.map((a) => (
                        <div key={a._id} className="col-md-3">
                            <div className={styles.article_image_wrap}>
                                <Image
                                    src={a.cover}
                                    alt={a.title}
                                    width={300}
                                    height={200}
                                    priority
                                    className={styles.article_image}
                                />
                                <Link href={`/articles/${a._id}`} className={styles.article_overlay}>
                                    <h5>{a.title}</h5>
                                    <p>{a.shortDescription}</p>
                                    <span className={styles.author}>{a.author}</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {paginatedData.nextCursor && (
                <div className="mt-4 text-center">
                    <Link
                        className='classic'
                        href={`/articles?cursor=${paginatedData.nextCursor}&limit=${paginatedData.limit}`}>
                        Load more
                    </Link>
                </div>
            )}
        </div>

    )
}
