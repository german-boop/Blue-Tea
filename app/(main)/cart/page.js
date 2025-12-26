import React from 'react'
import CartItems from '@/components/template/cart/cartItems'
import { getMe } from '@/utils/auth'
export default async function page() {
  const user = await getMe()

  return (
    <div className="py-5">
      <div className="header">
        <h3>Shopping Cart</h3>
      </div>
      <CartItems userId={JSON.parse(JSON.stringify(user._id))} />
    </div>
  )
}
