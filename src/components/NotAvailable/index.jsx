import React from "react";
import { NOT_AVAILABLE_IMAGE_URL } from "../../utils";

const NotAvailable = ({ title, img = NOT_AVAILABLE_IMAGE_URL }) => {
  return (
    <div className="w-full h-4-6 grid place-content-center gap-2 place-items-center">
      <img src={img} alt="No Video Available" />
      <h2 className="">{title}</h2>
    </div>
  );
};

export default NotAvailable;
