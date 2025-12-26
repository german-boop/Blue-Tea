import connectToDB from "@/db/db";
import dynamic from "next/dynamic";
import ProductModal from "@/model/product";
import ArticleModel from "@/model/article";
import commentModel from "@/model/comment";

const About = dynamic(() => import("@/components/template/index/about/about"))
const Menu = dynamic(() => import("@/components/template/index/menu/menu"))
const Products = dynamic(() => import("@/components/template/index/products/products"))
const Barista = dynamic(() => import("@/components/template/index/barista/barista"))
const Reviews = dynamic(() => import("@/components/template/index/reviews/reviews"))
const Reservation = dynamic(() => import("@/components/template/index/reservation/reservation"))
const Articles = dynamic(() => import("@/components/template/index/articles/articles"))
const Contact = dynamic(() => import("@/components/template/index/contact/contact"))




export default async function Home() {
    connectToDB()
    const products = await ProductModal
        .find({ score: 5 })
        .lean()
    const articles = await ArticleModel.find({})
        .sort({ _id: -1 })
        .limit(5)
        .lean();
    const comments = await commentModel.find({})
        .sort({ _id: -1 })
        .limit(10)
        .lean();


    return (
        <>
            <About />
            <Menu />
            <Products
                products={JSON.parse(JSON.stringify(products))} />
            <Barista />
            <Reviews comments={JSON.parse(JSON.stringify(comments))} />
            <Articles articles={JSON.parse(JSON.stringify(articles))} />
            <Contact />
            <Reservation />
        </>
    );
}
