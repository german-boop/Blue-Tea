import React from 'react'
import CategoryModel from '@/model/category'
import connectToDB from '@/db/db'
import AddNewProduct from '@/components/template/p-admin/products/addNewProduct'
export default async function page() {
    connectToDB()
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
        <>
            <h4 className='fw-bold'
                style={{ color: "var(--brown-light)", marginBottom: "1rem" }}>
                Create New Product
            </h4>
            <div className="transparentCard">
                <AddNewProduct
                    tree={JSON.parse(JSON.stringify(tree))} />
            </div>
        </>
    )
}
