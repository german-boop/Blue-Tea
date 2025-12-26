import { useState, useContext } from "react";
import CartContext from "../context/cartProvider";

export default function useBasket() {
  const [count, setCount] = useState(1);
  const { cart, setCart } = useContext(CartContext);

  const increaseCount = (id) => {
    setCount(prev => prev + 1);

    const newBasket = cart.map(item =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    );

    setCart(newBasket);
    localStorage.setItem("cart", JSON.stringify(newBasket));
  };

  const decreaseCount = (id) => {
    setCount(prev => (prev > 1 ? prev - 1 : 1));

    const newBasket = cart.map(item =>
      item.id === id && item.count > 1
        ? { ...item, count: item.count - 1 }
        : item
    );

    setCart(newBasket);
    localStorage.setItem("cart", JSON.stringify(newBasket));
  };

  const addToBasket = (product, title, img, price, quantity) => {
    const existItem = cart.find(item => item.product === product);

    let newCart;
    if (existItem) {
      newCart = cart.map(item =>
        item.product === product
          ? { ...item, count: item.count + quantity }
          : item
      );
    } else {
      newCart = [
        ...cart,
        {
          id: Date.now(), 
          product,
          title,
          img,
          price,
          count: quantity,
        },
      ];
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCount(1); 
  };

  const removeFromCart = (id) => {
    const filteredCart = cart.filter(item => item.id !== id);
    setCart(filteredCart);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
  };

  return {
    addToBasket,
    increaseCount,
    decreaseCount,
    removeFromCart,
    cart,
    count,
    setCount,
  };
}
