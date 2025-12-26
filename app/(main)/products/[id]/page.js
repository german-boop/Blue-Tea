import connectToDB from "@/db/db";
import ProductGallery from "@/components/template/productDetail/ProductGallery";
import ProductComments from "@/components/template/productDetail/ProductComments";
import commentModel from "@/model/comment";
import ProductModal from "@/model/product";
import AddToCart from "@/components/template/productDetail/addToCart";
export default async function Page({ params, searchParams }) {
    connectToDB()
    const { id } = await params
    const searchparams = await searchParams

    const page = Number(searchparams.page) || 1;
    const limit = Number(searchparams.limit) || 10;

    const product = await ProductModal.findOne({ _id: id }).lean();
    let cursor = null

    if (page > 1) {
        const prevComments = await commentModel
            .find({ productID: product._id }, "-__v")
            .sort({ _id: 1 })
            .limit((page - 1) * limit)
            .select("_id")
            .lean();
        cursor = prevComments[prevComments.length-1]?._id;
    }
    const query = cursor ? { _id: { $gt: cursor } } : {};

    const totalCount = await commentModel.countDocuments({ productID: product._id });
    const comments = await commentModel
        .find({ ...query, productID: product._id })
        .sort({ _id: 1 })
        .limit(limit)
        .lean();


    return (
        <div className="container py-5">
            <div className="row">
                {/* Images */}
                <ProductGallery images={product.img} />
                {/* Product Details */}
                <div className="col-md-6 p-5">
                    <h2 className="text-white">{product.name}</h2>
                    <p className="text-white">{product.shortDescription}</p>
                    <p className="fs-4 text-white"> $ {product.price}</p>
                    <AddToCart
                        productID={JSON.parse(JSON.stringify(product._id))}
                        img={product.img}
                        name={product.name}
                        price={product.price}
                    />
                    <hr />
                    <strong className=" text-white">About This Item:</strong>
                    <p className=" text-white">{product.longDescription}</p>
                    <hr />
                    <h5 className="text-white" >Features:</h5>
                    <ul>
                        <li className=" text-white">Mild and calming aroma</li>
                        <li className=" text-white">100% Organic</li>
                        <li className=" text-white">Promotes better sleep and reduces stress</li>
                    </ul>
                </div>
                <hr />
                <ProductComments
                    page={page}
                    totalCount={totalCount}
                    limit={limit}
                    comments={JSON.parse(JSON.stringify(comments))}
                    productID={JSON.parse(JSON.stringify(product._id))}
                />
            </div>
        </div>
    );
}
