import React from "react";
import { useVideos } from "../../context/VideosContext";

const Tag = ({ name, active, setActive }) => {
  const { filterVideos } = useVideos();
  return (
    <button
      className={`btn ${active ? "btn-primary" : "btn-outline-primary"} tag`}
      onClick={() => {
        setActive(name);
        filterVideos(name);
      }}
    >
      {name}
    </button>
  );
};

export default Tag;
