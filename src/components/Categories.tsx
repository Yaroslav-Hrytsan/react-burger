import React from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import type { CategoriesList } from "../types";
import categories from "../data/categories.json";
import { useFilter } from "../context";

const Categories: React.FC = () => {
  const { activeCategoryIndex, setActiveCategoryIndex } = useFilter();

  return (
    <div className="p-2 flex gap-5 overflow-x-auto py-2">
      {categories.map((category: CategoriesList) => {
        const isActive = activeCategoryIndex === category.id;
        return (
          <motion.button
            key={category.id}
            onClick={() => setActiveCategoryIndex(category.id)}
            className={clsx(
              "category py-1 px-4 rounded-lg transition-colors duration-200",
              isActive && "category-active"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: isActive ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {category.name}
          </motion.button>
        );
      })}
    </div>
  );
};

export default Categories;
