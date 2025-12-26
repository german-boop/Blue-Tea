
import EditArticle from "@/components/template/p-admin/articles/editArticle";
import ArticleModel from "@/model/article";

export default async function page({ params }) {
    const { id } = await params
    const article = await ArticleModel.findOne({ _id: id }).lean()

    return (
        <div>
            <h4 className="fw-bold mb-3"
                style={{ color: "var(--brown-light)" }}>
                Edit Article
            </h4>
            <div className="transparentCard">
                <EditArticle
                    data={JSON.parse(JSON.stringify(article))} />
            </div>
        </div>
    );
}
