import React from "react";
import empty from "../../assets/icons/empty.png";

const NotAvailable = ({ title, img = empty }) => {
  return (
    <div className="w-full  grid place-content-center gap-2 place-items-center">
      <img src={img} alt="No Video Available" />
      <h2 className="text-center">{title}</h2>
    </div>
  );
};

export default NotAvailable;
