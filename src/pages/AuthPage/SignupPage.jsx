import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";

const SignupPage = () => {
  const { signUp, signupCred, setSignupCred } = useAuth();

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
                placeholder="Enter your First name"
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
                placeholder="Enter your Last name"
                className="input"
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
                type="password"
                placeholder="Enter your password"
                className="input"
                defaultValue={signupCred.password}
                onChange={(e) =>
                  setSignupCred({ ...signupCred, password: e.target.value })
                }
                required
              />
              <i className="fa fa-eye"></i>
            </div>
            <div className="input-box input input-light">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm your password"
                className="input"
                defaultValue={signupCred.confirmPassword}
                onChange={(e) =>
                  setSignupCred({
                    ...signupCred,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />
              <i className="fa fa-eye"></i>
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
