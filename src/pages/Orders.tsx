import React from "react";
import { Link } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import OrderItem from "../components/OrderItem";

const Orders: React.FC = () => {
  const { orders, clearOrders } = useOrder()
  const isEmpty = orders.length === 0
  return (
    <div className="container">
      <div className="flex justify-between mb-4 items-center ">
        <h2 className="text-2xl font-semibold ">Мої замовлення</h2>
        <Link to="/">
          <button className="category py-1 px-4 rounded-lg transition-colors duration-200">Назад до товарів</button>
        </Link>
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-10 opacity-90">
          <h1 className="text-2xl text-gray-500 text-center max-w-md">
            Тут пусто, ви не зробили жодного замовлення... Перейдіть до кошика,
            щоб оформити замовлення 🛍️
          </h1>
        </div>
      ) : (
        <>
        <div>
          {orders.map((order) => (
            <OrderItem orderItem={order} key={order.orderNumber} />
          ))}
        </div>
          <div>
        <button onClick={()=> clearOrders()} className=" mt-2 bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg transition" >Видалити історію замовлень</button>
    </div>
        </>
      )}
    </div>
  );
};

export default Orders;
