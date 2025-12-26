
import dynamic from "next/dynamic";
import ScrollToTop from "@/utils/scrollToTop";
import { CartProvider } from "@/utils/context/cartProvider";

const Navbar = dynamic(() => import("@/components/modules/navbar/navbar"))
const Banner = dynamic(() => import("@/components/template/index/banner/banner"))
const Footer = dynamic(() => import("@/components/modules/footer/footer"))

export default function clientLayout({ children }) {
    return (
        <CartProvider>
            <Navbar />
            <Banner />
            <ScrollToTop />
            {children}
            <Footer />
        </CartProvider>
    );
}

