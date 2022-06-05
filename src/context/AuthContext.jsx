import axios from "axios";
import React, { createContext, useContext, useReducer, useState } from "react";
import { reducer } from "../reducers/reducer";
import {
  ACTION_TYPE_FAILURE,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
} from "../utils";
import { useToast } from "./ToastContext";

const AuthContext = createContext();
const initialSignupCredState = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
};
const initialLoginCredState = { email: "", password: "" };
const initialState = {
  data: JSON.parse(localStorage?.getItem("user")),
  loading: false,
  erorr: "",
};
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setToast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage?.getItem("user") ? true : false
  );
  const [token, setToken] = useState(localStorage?.getItem("token"));
  const [loginCred, setLoginCred] = useState(initialLoginCredState);
  const [signupCred, setSignupCred] = useState(initialSignupCredState);
  const signUp = (e) => {
    e.preventDefault();
    dispatch({ type: ACTION_TYPE_LOADING });
    if (signupCred.password !== signupCred.confirmPassword) {
      setToast({
        show: true,
        content: "Passwords do not match",
        type: "info",
      });
      return;
    }
    axios
      .post(
        "/api/auth/signup",
        JSON.stringify({
          firstName: signupCred.firstName,
          lastName: signupCred.lastName,
          email: signupCred.email,
          password: signupCred.password,
        })
      )
      .then((res) => {
        setToast({
          show: true,
          content: `Welcome, ${res.data.createdUser.firstName}`,
          type: "info",
        });
        setLoginCred(initialLoginCredState);
        setSignupCred(initialSignupCredState);
        storeUserData(res.data.createdUser);
        dispatch({ type: ACTION_TYPE_SUCCESS, payload: res.data.createdUser });
      })
      .catch((err) => {
        console.log(signupCred);
        console.log("err", err);
        if (err.message)
          setToast({
            show: true,
            content: "Email is already registered",
            type: "error",
          });

        dispatch({ type: ACTION_TYPE_FAILURE, payload: err.message });
      });
  };
  const logIn = (e) => {
    e.preventDefault();
    dispatch({ type: ACTION_TYPE_LOADING });

    axios
      .post(
        "/api/auth/login",
        JSON.stringify({
          email: loginCred.email,
          password: loginCred.password,
        })
      )
      .then((res) => {
        setToast({
          show: true,
          content: `Welcome, ${res.data.foundUser.firstName}`,
          type: "info",
        });
        localStorage.setItem("token", res.data.encodedToken);
        setLoginCred(initialLoginCredState);
        setSignupCred(initialSignupCredState);
        storeUserData(res.data.foundUser);
        dispatch({ type: ACTION_TYPE_SUCCESS, payload: res.data.foundUser });

        setIsLoggedIn(true);
      })
      .catch((err) => {
        if (err.message.slice(err.message.lastIndexOf(" ") + 1) === "401")
          setToast({
            show: true,
            content: "Wrong Password",
            type: "error",
          });
        else if (err.message.slice(err.message.lastIndexOf(" ") + 1) === "404")
          setToast({
            show: true,
            content: "Email is not registered yet",
            type: "error",
          });
        else setToast({ show: true, content: err.message, type: "error" });

        dispatch({ type: ACTION_TYPE_FAILURE, payload: err.message });
      });
  };
  const logOut = () => {
    setToast({
      show: true,
      content: `Goodbye, ${state.data.firstName}`,
      type: "warning",
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    dispatch({ type: ACTION_TYPE_SUCCESS, payload: [] });
  };
  const storeUserData = (data) => {
    setToken(localStorage.getItem("token"));
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        user: state,
        setUser: dispatch,
        isLoggedIn,
        signUp,
        logIn,
        logOut,
        loginCred,
        setLoginCred,
        signupCred,
        setSignupCred,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
