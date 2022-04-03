import React from "react";
import SideBarItem from "./SideBarItem";
import "./SideBar.css";
import { useNav } from "../../context/NavContext";
const SideBar = () => {
  const { sideBarItems, activeItem, setActiveItem } = useNav();
  return (
    <ul className="side-bar col bx-sh-primary-2 h-screen ">
      {sideBarItems.map((item) => (
        <SideBarItem
          to={item.to}
          key={item.name}
          name={item.name}
          icon={item.icon}
          active={activeItem === item.name}
          setActive={setActiveItem}
        />
      ))}
    </ul>
  );
};

export default SideBar;
