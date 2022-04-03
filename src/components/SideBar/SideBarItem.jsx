import React from "react";
import { Link } from "react-router-dom";

const SideBarItem = ({ icon, name, active, setActive, to }) => {
  return (
    <li>
      <Link
        onClick={() => setActive(name)}
        to={`/${to === "home" ? "" : to}`}
        className={`list-item text-center col gap-025 items-center list-item p-2  ${
          active ? "item-active" : ""
        }`}
      >
        {icon}
        <span className="item-name">{name}</span>
      </Link>
    </li>
  );
};

export default SideBarItem;
