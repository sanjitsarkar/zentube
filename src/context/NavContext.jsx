import React, { useState, createContext, useContext } from "react";
import {
  HistoryIcon,
  WatchLaterIcon,
  LikedIcon,
  HomeIcon,
  PlaylistPlayIcon,
} from "../assets/icons";
const NavContext = createContext();

const NavProvider = ({ children }) => {
  const [activeItem, setActiveItem] = useState("Home");
  const sideBarItems = [
    { name: "Home", icon: <HomeIcon />, to: "" },
    { name: "Playlist", icon: <PlaylistPlayIcon />, to: "playlist" },
    { name: "Liked Videos", icon: <LikedIcon />, to: "liked" },
    { name: "Watch Later", icon: <WatchLaterIcon />, to: "watch-later" },
    { name: "History", icon: <HistoryIcon />, to: "history" },
  ];
  return (
    <NavContext.Provider
      value={{
        sideBarItems,
        activeItem,
        setActiveItem,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

const useNav = () => useContext(NavContext);
export { useNav, NavProvider };
