import React from "react";

const NotAvailable = ({ title }) => {
  return (
    <div className="w-full h-4-6 grid place-content-center gap-2 place-items-center">
      <img
        src="https://booyah.live/ssr/_next/static/images/empty-vod-dark-mode.404178ec.png"
        alt="No Video Available"
      />
      <h2 className="">{title}</h2>
    </div>
  );
};

export default NotAvailable;
