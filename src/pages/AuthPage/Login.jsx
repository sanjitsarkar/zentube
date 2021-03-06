import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useAuth, useNav } from "../../context";

const LoginPage = () => {
  const { logIn, loginCred, setLoginCred, isLoggedIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { setActiveItem } = useNav();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    setActiveItem("");
  }, []);
  useEffect(() => {
    if (isLoggedIn) {
      if (pathname === "/signup") navigate("/", { replace: true });
      else if (pathname !== "/") navigate(-1, { replace: true });
    }
  }, [isLoggedIn, pathname]);
  return (
    <>
      <Header />
      <main className="form-container h-full t-0  l-0 r-0 relative grid place-content-center text-dark w-full">
        <form
          className="form p-5   br-sm text-dark b-solid b-1  br-light bx-sh-light-3 "
          onSubmit={logIn}
        >
          <label className="text-2xl mb-2 block text-center  font-normal">
            Login
          </label>
          <div className="col gap-1 mb-2">
            <div className="input-box input input-light">
              <i className="fa fa-user"></i>
              <input
                aria-label="email"
                type="text"
                placeholder="Enter your email"
                className="input"
                defaultValue={loginCred.email}
                onChange={(e) =>
                  setLoginCred({ ...loginCred, email: e.target.value })
                }
                required
              />
            </div>
            <div className="input-box input input-light">
              <i className="fa fa-lock"></i>
              <input
                aria-label="password"
                type={`${!showPassword ? "password" : "text"}`}
                placeholder="Enter your password"
                className="input"
                minLength={6}
                defaultValue={loginCred.password}
                onChange={(e) =>
                  setLoginCred({ ...loginCred, password: e.target.value })
                }
                required
                autoComplete="true"
              />
              <i
                className={`fa cursor-pointer ${
                  !showPassword ? "fa-eye" : "fa-eye-slash"
                }`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>

            <label className="checkbox-container">
              Remember Me
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>
          <button
            className="btn btn-dark w-full text-lg mb-2"
            aria-label="Login"
          >
            Login
          </button>
          <button
            className="btn btn-info w-full text-md mb-1"
            onClick={() => {
              setLoginCred({
                email: "johndoe@gmail.com",
                password: "johndoe123",
              });
            }}
          >
            Guest Login
          </button>
          <a href="#" className="text-dark-4 block mb-05">
            Forgot Password?
          </a>
          <Link to="/signup" className="text-dark-4 block" aria-label="Signup">
            Don't have an account?
          </Link>
        </form>
      </main>
    </>
  );
};

export default LoginPage;
