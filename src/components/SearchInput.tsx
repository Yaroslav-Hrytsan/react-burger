import React from "react";
import { useFilter } from "../context";
import {searchIcon} from "../assets";

const SearchInput: React.FC = () => {

  const [search, setSearch] = React.useState<boolean>(false);
  const [value,setValue] = React.useState<string>('')
  const { setSearchValue} = useFilter()
  
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Фокус на інпут, коли він з'являється
  React.useEffect(() => {
    if (search && inputRef.current) {
      inputRef.current.focus();
    }
  }, [search]);

  
  React.useEffect (()=> {
    const timeout = setTimeout(()=> {
      setSearchValue(value)
     
    } , 300)
    return ()=> clearTimeout(timeout)
  }, [value, setSearchValue]) 
  
  return (
    <li className="relative">
      {!search ? (
        <button
          className="flex items-center justify-center p-1 transition-all duration-300"
          onClick={() => setSearch(true)}
        >
          <img src={searchIcon} alt="search" className="h-7 w-7" />
        </button>
      )
      :
      (
        <input
          ref={inputRef}
          type="search"
          placeholder="Search..."
          value={value}
          onChange={(e)=> setValue(e.target.value)}
          onBlur={() => !value && setSearch(false)} // 🔑 коли інпут втрачає фокус → повертаємо кнопку
          className="
  border border-gray-500 rounded p-1
  focus:outline-none focus:ring-2 focus:ring-gray-500
  transition-all duration-300
  w-60 opacity-100 pl-2
  transform origin-left scale-x-100
"
        />
      )}      
    </li>
  );
};

export default SearchInput;
