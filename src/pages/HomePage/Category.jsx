import React from "react";
import { useVideos } from "../../context/VideosContext";

const Category = ({ name, active, setActive }) => {
  const { filterVideos } = useVideos();

  return (
    <button
      className={`btn font-bold ${
        active ? "btn-primary" : "btn-outline-primary"
      } category-button`}
      onClick={() => {
        setActive(name);
        filterVideos({ category: name, type: "video" });
      }}
    >
      {name}
    </button>
  );
};

export default Category;
