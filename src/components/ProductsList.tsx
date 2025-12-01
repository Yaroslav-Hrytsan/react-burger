import React from "react";
import {ProductCard} from "./index";
import products from "../data/products.json";
import { useFilter } from "../context";
import type { Product, SortType } from "../types";

const sortFunction: Record<SortType, (a: Product, b: Product) => number> = {
    дешевих: (a, b) => a.price - b.price,
    дорогих: (a, b) => b.price - a.price,
    популярних: (a, b) => b.rating - a.rating,
    "менш популярних": (a, b) => a.rating - b.rating,
  };
const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
const ProductsList: React.FC = () => {
  const { activeCategoryIndex, searchValue, sortValue } = useFilter();

  // const categoryFilter = activeCategoryIndex === 0
  // ? products
  // : products.filter((prod) => prod.categoryId === activeCategoryIndex)

  // const sortFunction: Record<SortType, (a: Product, b: Product) => number> = {
  //   дешевих: (a, b) => a.price - b.price,
  //   дорогих: (a, b) => b.price - a.price,
  //   популярних: (a, b) => b.rating - a.rating,
  //   "менш популярних": (a, b) => a.rating - b.rating,
  // };

  // const sortProduct =() => {
  //   if (!sortValue) return categoryFilter
  //   const sorted = sortFunction[sortValue.name]
  //   return [...categoryFilter].sort(sorted)
  // }

  // const searchProducts = sortProduct().filter(prod => {
  //   const normalize = (str: string) => str.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
  //   const search = normalize(searchValue)
  //   const nameMatch = normalize(prod.name).includes(search)
  //   const ingredientsMatch = prod.ingredients.some(ing=> normalize(ing).includes(search))
  //   return nameMatch || ingredientsMatch
  // });

  // const normalize = (str: string) =>
  //   str
  //     .toLowerCase()
  //     .normalize("NFD")
  //     .replace(/\p{Diacritic}/gu, "");

  const resultChange = React.useMemo(() => {
    let result = products;
    if (activeCategoryIndex !== 0) {
      result = result.filter((p) => p.categoryId === activeCategoryIndex);
    }
    if (sortValue?.name) {
      const sorted = sortFunction[sortValue.name];
      result = [...result].sort(sorted);
    }
    if (searchValue) {
      const search = normalize(searchValue);
      const nameMatch = (p: Product) => normalize(p.name).includes(search);
      const ingredientsMatch = (p: Product) =>
        p.ingredients.some((ing) => normalize(ing).includes(search));
      result = result.filter(
        (prod) => nameMatch(prod) || ingredientsMatch(prod)
      );
    }
    return result;
  }, [activeCategoryIndex, searchValue, sortValue])
  return (
    <div className=" container">
      
        {resultChange.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <h3 className="text-xl font-semibold">Товарів не знайдено</h3>
            <p className="text-sm text-gray-500 max-w-lg text-center">
              Спробуй змінити пошуковий запит, очистити фільтри або переглянути
              інші категорії.
            </p>
          </div>
        ) : 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
  {resultChange.map((prod) => (
    <ProductCard key={prod.id} product={prod} />
  ))}
</div>
        }
      
    </div>
  );
};

export default ProductsList;
