import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import {Header } from "../src/components/index";
import {Home, Cart, Orders } from './pages/index'
import { CartProvider, FilterProvider, OrderProvider} from "./context/index";

const App: React.FC = () => {
  return (
    <FilterProvider>
    <CartProvider>
      <OrderProvider>
        <div className="app-container mt-24">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </OrderProvider>
    </CartProvider>
    </FilterProvider>
  );
};

export default App;
