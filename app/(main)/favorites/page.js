import WishlistModal from '@/model/wishList';
import { getMe } from '@/utils/auth';
import { paginate } from '@/utils/helper';
import Product from '@/components/modules/product/product';
import WishList from '@/components/template/wishList/wishList';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata = {
  title: "Favorites List - Tea Shop",
  description: "View your favorite products on Tea Shop. Keep track of all items you love and save them for later.",
  keywords: ["Tea Shop", "Favorites", "Wishlist", "Saved Products", "Shopping"],
  authors: [{ name: "Tea Shop Team" }],
  openGraph: {
    title: "Favorites List - Tea Shop",
    description: "View your favorite products on Tea Shop. Keep track of all items you love and save them for later.",
    url: "https://yourwebsite.com/favorites",
    siteName: "Tea Shop",
    images: [
      {
        url: "https://yourwebsite.com/images/favorites-og.jpg",
        width: 1200,
        height: 630,
        alt: "Favorites List",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Favorites List - Tea Shop",
    description: "View your favorite products on Tea Shop. Keep track of all items you love and save them for later.",
    images: ["https://yourwebsite.com/images/favorites-og.jpg"],
  },
};

export default async function page({ searchParams }) {
  const user = await getMe()
  if (!user) return redirect("/login-register")

  const searchparams = await searchParams
  const paginatedData = await paginate(WishlistModal, searchparams, {}, "products", true, false)


  return (
    <>
      {user && paginatedData.data.length > 0 ?
        <div className='py-5'>
          <div className='header'>
            <h1>Favorites List</h1>
          </div>
          <div className='container-fluid'>
            <WishList
              nextCursor={paginatedData.nextCursor}
              limit={paginatedData.limit}
              data={JSON.parse(JSON.stringify(paginatedData.data))} />
          </div>

        </div>
        :
        <span>NOT FOUND</span>
      }
    </>
  )
}
