import React from "react";
import { useVideos } from "../../context/VideosContext";

const Tag = ({ name, active, setActive }) => {
  const { filterVideos } = useVideos();

  return (
    <button
      className={`btn font-bold ${
        active ? "btn-primary" : "btn-outline-primary"
      } tag`}
      onClick={() => {
        setActive(name);
        filterVideos({ tag: name, type: "video" });
      }}
    >
      {name}
    </button>
  );
};

export default Tag;
