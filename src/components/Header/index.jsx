import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";
const Header = () => {
  const { isLoggedIn, logOut } = useAuth();

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
      <ul
        className={`right row items-center gap-1 text-light
         
        }`}
      >
        <i className="search-icon fa fa-search "></i>

        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="btn btn-secondary">
                Signup
              </Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li>
              <Link to="/">
                <img
                  src="https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture.jpg"
                  alt="user"
                  className="avatar avatar-xsm "
                />
              </Link>
            </li>
            <li>
              <button className="btn btn-primary" onClick={logOut}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
