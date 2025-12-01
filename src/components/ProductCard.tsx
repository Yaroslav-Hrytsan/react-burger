import React from "react";
import type { Product } from "../types";
import { useCart } from "../context";

interface ProductCartProps {
  product: Product
}

const ProductCard: React.FC<ProductCartProps> = ({product}) => {
  const {name, id, price, ingredients, image} = product
  const {cartItems, addToCart, removeFromCart, } = useCart()
  const productInCart = cartItems.find( item => item.product.id === product.id)
  return (
<div className="flex flex-col bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300 h-full">
  {/* Картинка по центру */}
  <img
    className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-xl mx-auto mb-2"
    src={image}
    alt={name}
  />

  {/* Назва і інгредієнти */}
  <h2 className="font-semibold text-lg text-center">{name}</h2>
  <p className="text-gray-500 text-sm text-center">{ingredients.join(', ')}</p>

  {/* Spacer */}
  <div className="mt-auto flex justify-between items-center w-full">
    
    {/* Колонка ціна */}
    <div className="flex flex-col text-center">
      <span className="font-medium text-gray-600">Ціна</span>
      <span className="font-bold text-gray-800">{price} грн</span>
    </div>

    {/* Кнопки */}
    {productInCart ? (
      <div className="flex items-center gap-2">
        <button onClick={()=> removeFromCart(id)} className="styleButton">-</button>
        <span className="w-5 text-center">{productInCart.quantity}</span>
        <button onClick={()=> addToCart(product)}  className="styleButton">+</button>
      </div>
    ) : (
      <button 
        onClick={()=> addToCart(product)} 
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-lg transition"
      >
        Додати в корзину
      </button>
    )}
  </div>
</div>

  );
};

export default ProductCard;
