import axios from "axios";
import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useReducer,
} from "react";
import { useNavigate } from "react-router-dom";
import { initialState, reducer } from "../reducers/reducer";
import {
  ACTION_TYPE_FAILURE,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
} from "../utils";
import { usePlaylist } from "./PlaylistsContext";
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
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setToast } = useToast();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        setSignupCred(initialSignupCredState);
        dispatch({ type: ACTION_TYPE_SUCCESS, payload: res.data.createdUser });

        setIsLoggedIn(true);
      })
      .catch((err) => {
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
    setPlaylists({ type: ACTION_TYPE_SUCCESS, payload: [] });
    setPlaylistsInfo(new Map());
    setIsLoggedIn(false);
    dispatch({ type: ACTION_TYPE_SUCCESS, payload: [] });
  };
  useEffect(() => {
    if (isLoggedIn) {
      setToken(localStorage.getItem("token"));
      localStorage.setItem("user", JSON.stringify(state.data));
      navigate("/", { replace: true });
    }
  }, [isLoggedIn]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setIsLoggedIn(true);
      dispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: JSON.parse(localStorage.getItem("user")),
      });

      navigate("/", { replace: true });
    }
  }, []);
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
