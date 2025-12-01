import React from "react";
import type { CartItemData, OrderContextType, OrderItemsData } from "../types";

const OrderContext = React.createContext<OrderContextType | undefined>(undefined)

export const OrderProvider: React.FC<{children: React.ReactNode}> 
= ({
    children,
}) => {

    const [orders, setOrders]= React.useState<OrderItemsData[]>(() => {
        const saveOrders = localStorage.getItem('newOrder')
        return saveOrders ? JSON.parse(saveOrders) : []
    });

    React.useEffect(()=> {
        localStorage.setItem('newOrder', JSON.stringify(orders))
    }, [orders])

    const addToOrder = (cartItems: CartItemData[], allPrice: number) => {
        setOrders( prev => {
            const nextOrderNumber = prev.length > 0
            ? prev[prev.length-1].orderNumber +1
            : 1
    const order = {
        cartItems,
        orderNumber: nextOrderNumber,
        orderPrice: allPrice,
        orderDate: Date.now()
    }
    return [...prev, order]
        })
    }
    const clearOrders =() => setOrders([])

    const value: OrderContextType = React.useMemo(
    ()=> ({orders, addToOrder,clearOrders}),
    [orders])


    return (
        <OrderContext.Provider  value={value}>
            {children}
        </OrderContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOrder = () => {
    const context =React.useContext(OrderContext)
    if (!context) throw new Error("useOrder must be used with in a OrderProvider")
    return context
}