import React from "react";
import Header from "../Header";
import SideBar from "../SideBar";
import "./Layout.css";
const Layout = ({ children }) => {
  return (
    <div className="">
      <Header />
      <div className="body flex gap-1 ">
        <SideBar />
        <main className="main p-3 "> {children}</main>
      </div>
    </div>
  );
};

export default Layout;
