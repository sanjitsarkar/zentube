import React from "react";
import { useCategory } from "../../context";
import Category from "./Category";

const CategoryList = () => {
  const { categories, activeCategory, setActiveCategory } = useCategory();
  return (
    <div className="row categories">
      <Category
        name="All"
        active={activeCategory === "All"}
        activeCategory={activeCategory}
        setActive={setActiveCategory}
        key="1"
      />
      {!categories.loading &&
        categories.data.length > 0 &&
        categories.data.map((category) => (
          <Category
            name={category.name}
            active={activeCategory === category.name}
            activeCategory={activeCategory}
            setActive={setActiveCategory}
            key={category._id}
          />
        ))}
    </div>
  );
};

export default CategoryList;
