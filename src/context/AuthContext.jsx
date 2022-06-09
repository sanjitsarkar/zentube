import React, { createContext, useContext, useReducer, useState } from "react";
import { reducer } from "../reducers/reducer";
import {
  ACTION_TYPE_FAILURE,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
  getHTTPStatusCode,
} from "../utils";
import { callApi } from "../utils/callApi";
import { useToast } from "./ToastContext";
export { useAuth, AuthProvider };

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
  const [loginCred, setLoginCred] = useState(initialLoginCredState);
  const [signupCred, setSignupCred] = useState(initialSignupCredState);
  const signUp = async (e) => {
    e.preventDefault();
    dispatch({ type: ACTION_TYPE_LOADING });
    try {
      if (signupCred.password !== signupCred.confirmPassword) {
        setToast({
          show: true,
          content: "Passwords do not match",
          type: "info",
        });
        return;
      }
      const result = await callApi("post", "auth/signup", false, {
        firstName: signupCred.firstName,
        lastName: signupCred.lastName,
        email: signupCred.email,
        password: signupCred.password,
      });
      setToast({
        show: true,
        content: `Welcome, ${result.data.createdUser.firstName}`,
        type: "info",
      });
      setLoginCred(initialLoginCredState);
      setSignupCred(initialSignupCredState);
      storeUserData(result.data.createdUser);
      dispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data.createdUser,
      });
    } catch (err) {
      if (err.message)
        setToast({
          show: true,
          content: "Email is already registered",
          type: "error",
        });

      dispatch({ type: ACTION_TYPE_FAILURE, payload: err.message });
    }
  };
  const logIn = async (e) => {
    e.preventDefault();
    dispatch({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("post", "auth/login", false, {
        email: loginCred.email,
        password: loginCred.password,
      });
      setToast({
        show: true,
        content: `Welcome, ${result.data.foundUser.firstName}`,
        type: "info",
      });
      localStorage.setItem("token", result.data.encodedToken);
      setLoginCred(initialLoginCredState);
      setSignupCred(initialSignupCredState);
      storeUserData(result.data.foundUser);
      dispatch({ type: ACTION_TYPE_SUCCESS, payload: result.data.foundUser });

      setIsLoggedIn(true);
    } catch (err) {
      if (getHTTPStatusCode(err) === "401")
        setToast({
          show: true,
          content: "Wrong Password",
          type: "error",
        });
      else if (getHTTPStatusCode(err) === "404")
        setToast({
          show: true,
          content: "Email is not registered yet",
          type: "error",
        });
      else setToast({ show: true, content: err.message, type: "error" });

      dispatch({ type: ACTION_TYPE_FAILURE, payload: err.message });
    }
  };
  const logOut = () => {
    setToast({
      show: true,
      content: `Goodbye, ${state.data.firstName}`,
      type: "warning",
    });
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    dispatch({ type: ACTION_TYPE_SUCCESS, payload: [] });
  };
  const storeUserData = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
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
