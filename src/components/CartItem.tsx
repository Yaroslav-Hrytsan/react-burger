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
<div className="
  cart-item flex flex-col sm:flex-row items-center gap-4 p-4 
  border rounded-xl shadow-sm bg-white
">
  <img 
    src={image} 
    alt={name} 
    className="w-28 h-28 object-cover rounded-xl flex-shrink-0" 
  />

  <div className="flex-1 w-full">
    <h2 className="font-semibold text-lg">{name}</h2>
    <p className="text-gray-500 text-sm">{ingredients.join(", ")}</p>
    <div className="mt-2 text-gray-700 font-medium">Ціна: {price} грн.</div>
  </div>


  <div className="
    w-full sm:w-auto 
    flex items-center justify-between sm:justify-end 
    gap-4 mt-2
  ">
    
    <div className="flex items-center gap-2">
      <button onClick={() => reduceFromCart(id)} className="styleButton">-</button>
      <span className="w-6 text-center font-medium">{quantity}</span>
      <button 
        onClick={() => addToCart(product)} 
        className="styleButton" 
        disabled={quantity >= 10}
      >
        +
      </button>
    </div>

    
    <div className="font-semibold min-w-[90px] text-right">
      {totalPriceProduct} грн
    </div>

   
    <button onClick={() => removeFromCart(id)} className="styleButton">
      <img src={dell} alt="delete" className="w-5 h-5" />
    </button>
  </div>

</div>


  );
};

export default CartItem;
