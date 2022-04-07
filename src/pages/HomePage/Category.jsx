import React from "react";
import { useVideos } from "../../context/VideosContext";

const Category = ({ name, active, setActive }) => {
  return (
    <button
      className={`btn font-bold ${
        active ? "btn-primary" : "btn-outline-primary"
      } category-button`}
      onClick={() => {
        setActive(name);
      }}
    >
      {name}
    </button>
  );
};

export default Category;
