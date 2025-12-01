import React from "react";
import type { OrderItemProps } from "../types";

const OrderItem: React.FC<OrderItemProps> = ({ orderItem }) => {
  const date = new Date(orderItem.orderDate).toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="w-full border border-gray-300 rounded-2xl p-5 mt-6 shadow-sm bg-white">
      
      {/* Верхня панель */}
      <div className="flex justify-between items-center flex-wrap gap-y-2 mb-4">
        <div>
          <h2 className="text-lg font-semibold">
            Замовлення №{orderItem.orderNumber}
          </h2>
          <p className="text-sm text-gray-500">Дата: {date}</p>
        </div>

        <span className="text-xl font-bold text-green-600">
          {orderItem.orderPrice} грн
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {orderItem.cartItems.map((item) => (
          <div
            key={item.product.id}
            className="border rounded-xl p-3 flex flex-col items-center bg-gray-50"
          >
            <img
              className="w-20 h-20 object-cover rounded-lg mb-2"
              src={item.product.image}
              alt={item.product.name}
            />

            <p className="text-sm font-medium text-center">
              {item.product.name}
            </p>

            <span className="text-sm text-gray-600 mt-1">
              Кількість: <b>{item.quantity}</b>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItem;
