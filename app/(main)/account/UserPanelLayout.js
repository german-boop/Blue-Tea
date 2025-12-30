import { authUser } from "@/utils/auth";
import Dropdown from "@/utils/dropDown";
import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "@/components/modules/p-admin/sidebar.module.css"
import RefreshAccessToken from "@/utils/refreshAccessToken";
import { MdLogout } from "react-icons/md";

export default async function UserPanelLayout({ children }) {
    const user = await authUser()
    if (!user) {
        redirect("/")
    }
    const content = (
        <div className="container-fluid py-5">
            <div className="row">
                <div className="col-3">
                    <div className="d-flex align-items-center justify-content-between justify-content-lg-center">
                        <span className="text-white">WelCome To Your Dashboard</span>
                    </div>
                    <div className="mt-5">
                        <ul className="list-unstyled">
                            <li className={`${styles.sidebar_item} ${styles.active}`}>
                                <Link className={styles.sidebar_link} href="/p-admin">
                                    <i className="me-2 bi bi-grid-fill"></i>
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <Dropdown
                                icon="bi-box-seam"
                                title="Products"
                                items={[
                                    { label: "All Products", href: "/p-admin/products" },
                                    { label: "Create Product", href: "/p-admin/products/create" },
                                ]}
                            />
                            <Dropdown
                                icon="bi-chat-right-dots-fill"
                                title="Menu"
                                items={[
                                    { label: "Menu Items", href: "/p-admin/menu" },
                                    { label: "Create Menu Item", href: "/p-admin/menu/create" },
                                ]}
                            />
                            <Dropdown
                                icon="bi-people-fill"
                                title="Users"
                                items={[
                                    { label: "All Users", href: "/p-admin/users" },
                                    { label: "Create New User", href: "/p-admin/users/create" },

                                ]}
                            />
                            <Dropdown
                                icon="bi-chat-dots-fill"
                                title="Comments"
                                items={[
                                    { label: "All Comments", href: "/p-admin/comments" },
                                ]}
                            />
                            <li className={styles.sidebar_item}>
                                <Link className={styles.sidebar_link} href="/admin/discounts">
                                    <i className="me-2 bi bi-percent"></i>
                                    <span>Discounts</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="text-white d-flex gap-2 my-5 fs-5 align-items-center">
                        <MdLogout />
                        EXIT
                    </div>
                </div>
                <div className="col-6">
                    {children}
                </div>
            </div>
        </div>
    );


    return user.status === "expired" ? (
        <RefreshAccessToken
            shouldRefresh={true}>{content}
        </RefreshAccessToken>
    ) : (content)
}




