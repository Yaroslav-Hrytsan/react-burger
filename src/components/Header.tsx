import React from "react";
import {cart, burgerMenu, hamburgerLogo} from "../assets";
import { Link } from "react-router-dom";
import {SearchInput} from "./index";
import { useCart } from "../context";

const Header: React.FC = () => {
  const { allPrice } = useCart()

  const [isScroll, setIsScroll] =React.useState(false)

  React.useEffect(()=> {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 5)
    }
    window.addEventListener('scroll',handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

    return (
    <header
  className={`
    fixed top-0 left-0 w-full z-50
    px-4 py-3
    bg-white transition-all duration-300
    ${isScroll ? "shadow-md" : "shadow-none"}
  `}
>
  <div className="pl-4 pr-4 flex flex-col gap-3 md:flex-row md:justify-between md:items-center">

    {/* LOGO */}
    <Link to="/" className="flex items-center gap-3 flex-shrink-0">
      <img src={hamburgerLogo} className="w-14 h-14 flex-shrink-0" />
      <div>
        <h2 className="text-2xl font-bold">React Burger</h2>
        <span className="text-gray-500 font-semibold">the best burger</span>
      </div>
    </Link>

    {/* SEARCH + ICONS */}
    <div className="flex items-center gap-6 justify-around w-full md:w-auto">

      <SearchInput />

      <Link to="/cart" className="flex items-center gap-1">
        <img src={cart} className="w-7 h-7 flex-shrink-0" />
        {allPrice > 0 && (
          <span className="text-gray-500 font-bold">{allPrice} грн</span>
        )}
      </Link>

      <Link to="/orders">
        <img src={burgerMenu} className="w-7 h-7 flex-shrink-0" />
      </Link>
    </div>

  </div>
</header>

  );
};

export default Header;
