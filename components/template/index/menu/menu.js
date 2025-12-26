
import styles from "@/components/template/index/menu/menu.module.css"
import CategoryModel from "@/model/category"
import menuItemModel from "@/model/menuItem"
import MenuItem from "./menuItem"
import { MotionDiv } from "@/utils/animate"
export default async function Menu() {
    const categories = await CategoryModel.find({}).lean()
    const products = await menuItemModel.find({}).populate("category").lean()
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
        <section id="menu">
            <div className={`${styles.menu} container`}>
                <h1 className="heading">Our Menu <span>Popular Menu</span></h1>
                <div className={`${styles.menu_section} row justify-content-center`}>
                    {tree.map(item => (
                        item.slug === "menu" && item.children?.map(cat => (
                            <MotionDiv
                                initial={{ opacity: 0, rotateX: 180 }}
                                whileInView={{ opacity: 1, rotateX: 0 }}
                                transition={{ duration: 1.07 }}
                                className="col-lg-6 col-12 mt-4 mb-lg-0"
                                key={cat._id}>
                                <div className={styles.menu_block__wrap}>
                                    <div className="text-center pb-lg-2">
                                        <h4>{cat.name}</h4>
                                    </div>
                                    <MenuItem
                                        catId={cat._id}
                                        products={JSON.parse(JSON.stringify(products))} />
                                </div>
                            </MotionDiv>
                        ))
                    ))}
                </div>
                <div className={styles.chef_item}>
                    <img src="/images/b67706a7-8ec4-4706-b58d-a889093e4988_removalai_preview.png"
                        alt="logo" />
                </div>
            </div>
        </section>
    )
}


