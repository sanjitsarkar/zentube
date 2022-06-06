import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LOGO from "../../assets/logo.png";
import { useAuth, useNav, useVideos } from "../../context";
import "./Header.css";
const Header = () => {
  const { isLoggedIn, logOut } = useAuth();
  const { filterVideos, filters, setFilters } = useVideos();
  const { activeItem } = useNav();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await filterVideos({ type: "video", ...filters });
    })();
  }, [filters]);
  return (
    <header
      id="header"
      className=" pt-2 pb-2 t-0 l-0 fixed bg-dark w-full bx-sh-primary-3 row justify-between items-center"
    >
      <div className="row items-center justify-between w-full flex-nowrap gap-1">
        <div className="row gap-1 items-center flex-nowrap ">
          <div className="left title">
            <Link to="/" className="text-2xl row gap-1 items-center">
              <img src={LOGO} alt="ZenTube" className="w-10 logo" />
              <span>
                Zen<span className="text-primary">Tube</span>
              </span>
            </Link>
          </div>
          <div className="input-box input input-dark">
            <i className="fa fa-search"></i>
            <input
              aria-label="search"
              type="search"
              placeholder="Search videos..."
              className="input"
              defaultValue={filters.search}
              onClick={() => {
                if (activeItem !== "Home") navigate("/");
              }}
              onChange={(e) => {
                const _filters = { ...filters, search: e.target.value };
                setFilters(_filters);
              }}
            />
          </div>
        </div>

        <ul
          className={`right row items-center gap-1 text-light
         
        }`}
        >
          {!isLoggedIn && (
            <li>
              <Link
                to="/login"
                className="btn btn-primary auth-button"
                aria-label="Login"
              >
                Login
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button
                aria-label="Logut"
                className="btn btn-secondary auth-button"
                onClick={logOut}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
