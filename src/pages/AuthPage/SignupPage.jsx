import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useAuth, useNav } from "../../context";

const SignupPage = () => {
  const { signUp, signupCred, setSignupCred, isLoggedIn } = useAuth();
  const { setActiveItem } = useNav();
  useEffect(() => {
    setActiveItem("");
  }, []);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (isLoggedIn) {
      if (pathname === "/signup") navigate("/", { replace: true });
      else if (pathname !== "/") navigate(-1, { replace: true });
    }
  }, [isLoggedIn, pathname]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <>
      <Header />
      <main className="form-container h-full t-0  l-0 r-0 relative grid place-content-center text-dark w-full">
        <form
          className="form p-5  br-sm text-dark b-solid b-1  br-light bx-sh-light-3 "
          onSubmit={signUp}
        >
          <label className="text-2xl mb-2 block text-center  font-normal">
            Signup
          </label>
          <div className="col gap-1 mb-2">
            <div className="input-box input input-light">
              <i className="fa fa-user"></i>
              <input
                type="text"
                placeholder="Enter your first name"
                className="input"
                defaultValue={signupCred.firstName}
                onChange={(e) =>
                  setSignupCred({ ...signupCred, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="input-box input input-light">
              <i className="fa fa-user"></i>
              <input
                type="text"
                placeholder="Enter your last name"
                className="input"
                aria-label=""
                defaultValue={signupCred.lastName}
                onChange={(e) =>
                  setSignupCred({ ...signupCred, lastName: e.target.value })
                }
                required
              />
            </div>
            <div className="input-box input input-light">
              <i className="fa fa-user"></i>
              <input
                type="email"
                placeholder="Enter your email"
                className="input"
                defaultValue={signupCred.email}
                onChange={(e) =>
                  setSignupCred({ ...signupCred, email: e.target.value })
                }
                required
              />
            </div>
            <div className="input-box input input-light">
              <i className="fa fa-lock"></i>
              <input
                type={`${!showPassword ? "password" : "text"}`}
                placeholder="Enter your password"
                className="input"
                minLength={6}
                defaultValue={signupCred.password}
                onChange={(e) =>
                  setSignupCred({ ...signupCred, password: e.target.value })
                }
                required
              />
              <i
                className={`fa cursor-pointer ${
                  !showPassword ? "fa-eye" : "fa-eye-slash"
                }`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
            <div className="input-box input input-light">
              <i className="fa fa-lock"></i>
              <input
                type={`${!showConfirmPassword ? "password" : "text"}`}
                placeholder="Confirm your password"
                className="input"
                minLength={6}
                defaultValue={signupCred.confirmPassword}
                onChange={(e) =>
                  setSignupCred({
                    ...signupCred,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />
              <i
                className={`fa cursor-pointer ${
                  !showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                }`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              ></i>
            </div>
          </div>
          <button className="btn btn-dark w-full text-lg mb-2">Signup</button>
          <Link to="/login" className="text-dark-4 block">
            Already have an account?
          </Link>
        </form>
      </main>
    </>
  );
};

export default SignupPage;
