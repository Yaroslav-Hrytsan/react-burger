export interface Product {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  available: boolean;
  ingredients: string[];
  image: string;
  rating: number;
}

export interface CartItemData {
  product: Product
  quantity: number
}

export interface CartContextType {
  cartItems: CartItemData[];
  addToCart: (product: Product) => void;
  reduceFromCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  allPrice: number
}

export interface CategoriesList {
  id: number;
  name: string;
}

export type SortType = "дешевих" | "дорогих" | "популярних" | "менш популярних";

export interface FilterValue {
  name: SortType;
  src: string;
  id: number;
}

export interface FilterContextType {
searchValue: string
setSearchValue: (value: string) => void
sortValue: FilterValue| null
setSortValue: (value: FilterValue | null) => void 
activeCategoryIndex: number
setActiveCategoryIndex: (value: number)=> void
}

export interface OrderItemsData {
    cartItems: CartItemData[]
    orderNumber: number
    orderPrice: number
    orderDate: number
}

export interface OrderContextType {
    orders: OrderItemsData[]
    addToOrder: (cartItems: CartItemData[], 
        orderPrice: number) => void
        clearOrders: ()=> void
}

export interface OrderItemProps {
  orderItem: OrderItemsData;
}


