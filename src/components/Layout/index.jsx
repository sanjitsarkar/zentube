import React from "react";
import Header from "../Header";
import SideBar from "../SideBar";
import "./Layout.css";
const Layout = ({ children }) => {
  return (
    <div className="">
      <Header />
      <div className="body flex gap-1 h-screen">
        <SideBar />
        <main className="main"> {children}</main>
      </div>
    </div>
  );
};

export default Layout;
