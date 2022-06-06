import React from "react";
import { useVideos } from "../../context";

const Category = ({ name, active, setActive }) => {
  const { filterVideos, setFilters, filters } = useVideos();

  return (
    <button
      className={`btn font-bold ${
        active ? "btn-primary" : "btn-outline-primary"
      } category-button`}
      onClick={() => {
        setActive(name);
        const _filters = { ...filters, category: name };
        setFilters(_filters);
      }}
    >
      {name}
    </button>
  );
};

export default Category;
