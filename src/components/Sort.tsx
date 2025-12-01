import React, { useEffect, useRef } from "react";
import {menu, listPlus, arrowDown, arrowUp, dell } from "../assets";
import { AnimatePresence, motion} from "motion/react";
import { useFilter } from "../context";
import type { FilterValue} from '../types'


const filterList: FilterValue[] = [
  { id: 1, name: "дешевих", src: arrowDown },
  { id: 2, name: "дорогих", src: arrowUp },
  { id: 3, name: "популярних", src: arrowUp },
  { id: 4, name: 'менш популярних', src: arrowDown },
];

const FilterSort = () => {

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const {sortValue, setSortValue} = useFilter()

  const listRef = useRef<HTMLUListElement>(null)

  useEffect( ()=> {
    if (!isOpen) return
    const onClickOutList = (e: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(e.target as Node)) return setIsOpen(false)
    }
    document.addEventListener('mousedown', onClickOutList)
    return ()=> document.removeEventListener('mousedown', onClickOutList)
  }, [isOpen])

  const changeSort = (el: FilterValue) => {
    setSortValue(el);
    openClose();
  };
  const clearSort = () => {
    setSortValue(null);
    setIsOpen(true);
  };
  const openClose = () => {
    setIsOpen((prev) => !prev);
  };

  return (
<div className="relative inline-block mr-6">
  <div className="flex mt-2 ml-5 items-center gap-2">
    {sortValue ? (
      <img
        className="cursor-pointer w-5 h-5"
        onClick={() => clearSort()}
        src={dell}
        alt="close"
      />
    ) : (
      <img
        className="cursor-pointer w-5 h-5"
        onClick={() => openClose()}
        src={isOpen ? listPlus : menu}
        alt={isOpen ? "menuPlus" : "menu"}
      />
    )}
    <h2 className="text-sm font-medium">
      {sortValue
        ? `Сортування від: ${sortValue.name}`
        : "Сортування"}
    </h2>
  </div>

  <AnimatePresence>
  {isOpen && (
    <motion.ul
      ref={listRef}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.15 }}
      className="absolute mt-1 mr-6 bg-white shadow-lg rounded-md w-48 z-50"
    >
      {filterList.map((el) => (
        <motion.li
          key={el.id}
          onClick={() => changeSort(el)}
          className="sort-list flex items-center p-2 cursor-pointer gap-2 rounded-md"
          whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
          whileTap={{ scale: 0.95 }}
        >
          <img className="w-4 h-4" src={el.src} alt={el.name} />
          <span className="text-sm">{el.name}</span>
        </motion.li>
      ))}
    </motion.ul>
  )}
</AnimatePresence>
</div>
  );
};
export default FilterSort;
