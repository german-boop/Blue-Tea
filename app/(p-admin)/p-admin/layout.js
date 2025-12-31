import Header from "@/components/modules/p-admin/header";
import Sidebar from "@/components/modules/p-admin/sidebar";
import { authAdmin } from "@/utils/auth";
import { redirect } from "next/navigation";
import RefreshAccessToken from "@/utils/refreshAccessToken";
export default async function AdminPanelLayout({ children }) {
    const admin = await authAdmin()
    if (!admin) {
        redirect("/")
    }
    const content = (
        <div className="menu_wrapper">
            <input
                type="checkbox"
                id="hamburger"
                className="hamburger_input"
            />
            <label htmlFor="hamburger"
                className="hamburger">
                <span></span>
            </label>
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="content">
                <Header />
                <div className="container-fluid">
                    {children}
                </div>
            </div>
        </div>
    );


    if (admin.status === "expired") {
        return (
            <RefreshAccessToken
             shouldRefresh={true}>
              {content}
            </RefreshAccessToken>
        );
    }
    return content;
}





