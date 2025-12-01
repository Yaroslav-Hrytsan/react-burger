import { useCart } from "../context";
import type { CartItemData } from "../types";
import {dell} from "../assets";

interface CartItemProps {
  productsCart: CartItemData;
}

const CartItem: React.FC<CartItemProps> = ({ productsCart }) => {
  const { addToCart, removeFromCart, reduceFromCart } = useCart();
  const { quantity, product } = productsCart;
  const { id, name, image, ingredients, price } = product;
  const totalPriceProduct = price * quantity;

  return (
<div className="cart-item">
  <img src={image} alt={name} className="w-24 h-24 object-cover rounded-xl" />
  <div className="flex-1 flex flex-col justify-between">
    <h2 className="font-semibold text-lg">{name}</h2>
    <p className="text-gray-500 text-sm">{ingredients.join(", ")}</p>
    <div className="mt-2 text-gray-700 font-medium">Ціна: {price} грн.</div>
  </div>
  
  <div className="flex items-center gap-2">
    <button onClick={() => reduceFromCart(id)} className="styleButton">-</button>
    <span className="w-6 text-center font-medium">{quantity}</span>
    <button onClick={() => addToCart(product)} className="styleButton" disabled={quantity>=10}>+</button>
  </div>

  <div className="text-right min-w-[120px] font-semibold text-gray-800">
    {totalPriceProduct} грн
  </div>

  <button onClick={() => removeFromCart(id)} className="styleButton">
    <img src={dell} alt="x" className="w-5 h-5" />
  </button>
</div>

  );
};

export default CartItem;
