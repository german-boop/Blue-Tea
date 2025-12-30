import CategoryModel from "@/model/category";
import ProductModal from "@/model/product";
import connectToDB from "@/db/db";
import { paginate } from "@/utils/helper";
import Product from "@/components/modules/product/product";
import Link from "next/link";
export async function generateMetadata({ searchParams }) {
    const categoryName = searchParams.category || "Products";
    await connectToDB();
    const category = categoryName ? await CategoryModel.findOne({ name: categoryName }) : null;

    return {
        title: categoryName ? `${categoryName} Products | Tea Shop` : "All Products | Tea Shop",
        description: categoryName
            ? `Explore our ${categoryName} products that have a positive effect on the body. High-quality, natural items for your healthy lifestyle.`
            : "Browse our full collection of products. High-quality, natural items for your healthy lifestyle.",
        openGraph: {
            title: categoryName ? `${categoryName} Products | Tea Shop` : "All Products | Tea Shop",
            description: categoryName
                ? `Explore our ${categoryName} products that have a positive effect on the body.`
                : "Browse our full collection of products.",
            url: `https://www.yourdomain.com/products?category=${categoryName || ""}`,
            siteName: "Tea Shop",
            images: category?.img ? [{ url: category.img, width: 800, height: 600 }] : [],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: categoryName ? `${categoryName} Products | Tea Shop` : "All Products | Tea Shop",
            description: categoryName
                ? `Explore our ${categoryName} products that have a positive effect on the body.`
                : "Browse our full collection of products.",
            images: category?.img ? [category.img] : [],
        },
    };
} export default async function page({ searchParams }) {
    connectToDB()
    const params = await searchParams
    const categoryName = await params.category
    let categoryId;

    if (categoryName) {
        const category = await CategoryModel.findOne({ name: categoryName })
        if (category) categoryId = category._id;
    }

    const paginatedData = await paginate(ProductModal, params, categoryId, null, true, false)


    return (
        <>
            <div className="py-5">
                <div>
                    <h3 className="header">{categoryName}
                        <span> positive effect on the body</span></h3>
                </div>
                <div className="container">
                    <div className="row">
                        {paginatedData.data.map((item, index) => (
                            <Product
                                key={index + 1}
                                id={item._id}
                                name={item.name}
                                img={item.img}
                                shortDescription={item.shortDescription}
                                score={item.score}
                                price={item.price}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {paginatedData.nextCursor && (
                <div className="mt-4 text-center">
                    <Link
                        className='classic'
                        href={`/products?category=${categoryName}&cursor=${paginatedData.nextCursor}&limit=${paginatedData.limit}`}>
                        Load more
                    </Link>
                </div>
            )}
        </>

    )
}
