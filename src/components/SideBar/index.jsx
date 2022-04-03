import React, { useState } from "react";
import {
  HistoryIcon,
  WatchLaterIcon,
  LikedIcon,
  HomeIcon,
  PlaylistPlayIcon,
} from "../../assets/icons";
import SideBarItem from "./SideBarItem";
import "./SideBar.css";
const SideBar = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const sideBarItems = [
    { name: "Home", icon: <HomeIcon />, to: "" },
    { name: "Playlist", icon: <PlaylistPlayIcon />, to: "playlist" },
    { name: "Liked Videos", icon: <LikedIcon />, to: "liked" },
    { name: "Watch Later", icon: <WatchLaterIcon />, to: "watch-later" },
    { name: "History", icon: <HistoryIcon />, to: "history" },
  ];
  return (
    <ul className="side-bar col bx-sh-primary-2   h-screen ">
      {sideBarItems.map((item) => (
        <SideBarItem
          to={item.to}
          key={item.name}
          name={item.name}
          icon={item.icon}
          active={item.name === activeItem}
          setActive={setActiveItem}
        />
      ))}
    </ul>
  );
};

export default SideBar;
