"use client"
import { useState } from "react";
import { useGet } from "@/utils/hooks/useReactQueryPublic";
import Image from "next/image";
import Link from "next/link";
import styles from '@/components/template/index/articles/articles.module.css';

export default function ArticlesList({ data: initialData, limit, nextCursor }) {
    const [articles, setArticles] = useState(initialData);
    const [cursor, setCursor] = useState(nextCursor);
    const [loading, setLoading] = useState(false);

    const { refetch } = useGet(
        "/articles",
        { cursor, limit },
        { enabled: false }
    );

    const loadMore = async () => {
        if (!cursor || loading) return;

        setLoading(true);
        const res = await refetch();

        setArticles(prev => [...prev, ...res.data.data]);
        setCursor(res.data.nextCursor);
        setLoading(false);
    };

    return (

        <div className="row gap-5 align-items-center justify-content-center">
            {articles.map((a) => (
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
            {cursor && (
                <div className="mt-5 col-12">
                    <button onClick={loadMore} className="classic w-100"
                        disabled={loading}>
                        {loading ? "Loading..." : "Load more"}
                    </button>
                </div>
            )}
        </div>
    );
}
