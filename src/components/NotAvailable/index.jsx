import React from "react";
import empty from "./empty.png";
const NotAvailable = ({
  title,
  img = empty,
  children,
  classes = "",
  type = "",
}) => {
  return (
    <div
      className={`w-full grid place-content-center ${
        type === "404" ? "gap-2" : "gap-1"
      } place-items-center ${classes}`}
    >
      <img
        src={img}
        className={`${type === "404" ? "w-80" : "w-60"}`}
        alt={title}
      />
      <h2 className="text-center text-xl text-lightBlue">{title}</h2>
      {children}
    </div>
  );
};

export default NotAvailable;
