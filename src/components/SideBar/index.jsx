import React from "react";
import { useNav } from "../../context";
import "./SideBar.css";
import SideBarItem from "./SideBarItem";
const SideBar = () => {
  const { sideBarItems, activeItem, setActiveItem } = useNav();
  return (
    <ul className="side-bar col bx-sh-primary-2 h-screen bg-dark">
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
