import WishlistModal from '@/model/wishList';
import { getMe } from '@/utils/auth';
import { paginate } from '@/utils/helper';
import Product from '@/components/modules/product/product';
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
          <div className='container'>
            <div className='row gap-1'>
              {
                paginatedData.data.map((w, index) => (
                  w.products.map((item, index) => (
                    <Product
                      key={index + 1}
                      id={item._id}
                      name={item.name}
                      img={item.img}
                      shortDescription={item.shortDescription}
                      score={item.score}
                      price={item.price}
                    />

                  ))
                ))
              }
            </div>
            {paginatedData.nextCursor && (
              <div className="mt-4 text-center">
                <Link
                  className='classic'
                  href={`/favorites?cursor=${paginatedData.nextCursor}&limit=${paginatedData.limit}`}>
                  Load more
                </Link>
              </div>
            )}
          </div>

        </div>
        :
        <span>NOT FOUND</span>
      }
    </>
  )
}
