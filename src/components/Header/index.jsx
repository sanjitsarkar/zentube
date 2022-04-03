import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <header
      id="header"
      className="p-3 pt-2 pb-2 t-0 l-0 fixed bg-dark w-full bx-sh-primary-3 row justify-between items-center"
    >
      <div className="row gap-1 items-center">
        <div className="row gap-1 items-center justify-between w-full">
          <div className="left">
            <Link to="/" className="text-2xl">
              Zen<span className="text-primary">Tube</span>
            </Link>
          </div>
          <div className="right">
            <div className="input-box input input-dark">
              <i className="fa fa-search"></i>
              <input
                type="search"
                placeholder="Search videos..."
                className="input"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row gap-1 items-center">
        <button>
          <i className="search-icon fa fa-search text-primary fa-xl"></i>
        </button>

        <button className="col gap-05 items-center">
          <i className="fa fa-user fa-xl"></i>
          <span className="text-md ">Login</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
