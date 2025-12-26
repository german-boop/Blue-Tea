import connectToDB from "@/db/db";
import ArticleModal from "@/model/article";
import Image from "next/image";
import Link from "next/link";
import styles from '@/components/template/index/articles/articles.module.css'


export default async function ArticlePage({ params }) {
    await connectToDB();
    const { id } = params;

    const article = await ArticleModal.findOne({ _id: id }).lean();

    const otherArticles = await ArticleModal.find({ _id: { $ne: id } })
        .sort({ createdAt: -1 })
        .limit(4)
        .lean();

    return (
        <div className="py-5">
            <div className='header'>
                <h1>{article.title}</h1>
            </div>
            <div className="container">
                <div className="row align-items-center">
                    <div
                        className={`${styles.img_container} col-6`}>
                        {article.cover &&
                            <Image
                                width={200}
                                height={200}
                                alt=""
                                src={article.cover} />}
                    </div>
                    <div className="col-6 p-5">
                        <p className="text-white fw-bold fs-5">{article.shortDescription}</p>
                        <hr />
                        <div className="text-white">
                            {article.content && (
                                <div dangerouslySetInnerHTML={{ __html: article.content }} />
                            )}
                        </div>                       <hr />
                        <h5 className="text-white">Features / Highlights:</h5>
                        <ul>
                            {article.features?.map((f, idx) => (
                                <li key={idx} className="text-white">{f}</li>
                            ))}
                        </ul>
                        <span className="text-white"> <strong>Author</strong> :{article.author}</span>
                    </div>
                    <hr />
                    <div className="col-12 my-5">
                        <div className="d-flex justify-content-between mb-3">
                            <h4 className="text-white fw-bold">Other Articles</h4>
                            <button className="classic">More...</button>
                        </div>
                        <ul className="row align-items-center">
                            {otherArticles.map((a, index) => (
                                <div
                                    key={index + 1}
                                    className="col-3">
                                    <div
                                        className={styles.article_image_wrap}>
                                        <Image
                                            src={a.cover}
                                            alt={a.title}
                                            width={200}
                                            height={200}
                                            className={styles.article_image}
                                        />
                                        <Link
                                            href={`/articles/${a._id}`}
                                            className={styles.article_overlay}>
                                            <h4>{a.title}</h4>
                                            <p>{a.shortDescription}</p>
                                            <span className={styles.author}>{a.author}</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
