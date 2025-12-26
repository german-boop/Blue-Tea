import ProductModal from "@/model/product";
import CategoryModel from "@/model/category";
import EditProduct from "@/components/template/p-admin/products/editProduct";
export default async function page({ params }) {
    const { id } = await params
    const product = await ProductModal.findOne({ _id: id }).lean()
    const categories = await CategoryModel.find({}).lean()
    const tree = []

    const buildChildren = (parent) => {
        const children = [...categories].filter(cat => cat.parentId?.toString() === parent._id.toString())
            .map(cat => ({ ...cat, children: buildChildren(cat) }));

        return children
    }

    categories.filter(parent => {
        if (!parent.parentId) {
            tree.push({ ...parent, children: buildChildren(parent._id) })
        }
    })
    return (
        <div>
            <h4 className="fw-bold mb-3" style={{ color: "var(--brown-light)" }}>
                Edit Article
            </h4>
            <div className="transparentCard">
                <EditProduct
                    data={JSON.parse(JSON.stringify(product))}
                    tree={JSON.parse(JSON.stringify(tree))}
                />
            </div>
        </div>
    );
}
