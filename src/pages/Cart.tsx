import React from "react";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import emptyCart from "../../src/assets/empty-cart.svg";
import { Link } from "react-router-dom";
import { useOrder } from "../context/OrderContext";

const Cart: React.FC = () => {
  const { cartItems, allPrice, clearCart } = useCart();
  const { addToOrder } = useOrder();
  const isEmpty = cartItems.length === 0;

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between mb-6 items-center gap-2">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          🛒 Кошик
        </h2>
        {!isEmpty ? (
          <button
            onClick={clearCart}
            className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
          Очистити кошик
          </button>
        ) : (
          <Link to="/">
            <button className="category py-1 px-4 rounded-lg transition-colors duration-200">
              Повернутись до товарів
            </button>
          </Link>
        )}
      </div>
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-10 opacity-90">
          <img
            src={emptyCart}
            alt="empty cart"
            className="w-48 h-48 mb-4 opacity-80 animate-bounce"
          />
          <h1 className="text-2xl text-gray-500 text-center max-w-md">
            Тут пусто... Додайте товар, щоб оформити замовлення 🛍️
          </h1>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <CartItem key={item.product.id} productsCart={item} />
            ))}
          </div>

          <div className="cart-summary">
            <span>
              Сума до оплати: <span className="total">{allPrice} грн</span>
            </span>
            <button
              onClick={() => {
                addToOrder(cartItems, allPrice);
                clearCart();
              }}
              className="btn-primary"
            >
              Оформити ваше замовлення
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
