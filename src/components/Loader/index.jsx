import React from "react";
import "./Loader.css";
const Loader = () => {
  return (
    <div className="w-full h-full grid place-content-center">
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
