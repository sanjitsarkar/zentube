import axios from "axios";
import React, { useEffect, createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "../reducers/reducer";
import {
  ACTION_TYPE_FAILURE,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
} from "../utils";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";
const HistoryContext = createContext();

const HistoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { token, isLoggedIn } = useAuth();

  const { setToast } = useToast();

  const fetchHistory = () => {
    dispatch({ type: ACTION_TYPE_LOADING });
    axios
      .get("/api/user/history", {
        headers: { authorization: token },
      })
      .then((res) => {
        dispatch({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.history,
        });
      })
      .catch((err) => {
        dispatch({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
  };
  const addToHistory = (video) => {
    dispatch({ type: ACTION_TYPE_LOADING });

    if (!isLoggedIn) {
      dispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: [],
      });
      return;
    }

    axios
      .post(
        "/api/user/history",
        JSON.stringify({
          video,
        }),
        {
          headers: { authorization: token },
        }
      )
      .then((res) => {
        dispatch({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.history,
        });
      })
      .catch((err) => {
        dispatch({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
  };
  const removeFromHistory = (id) => {
    dispatch({ type: ACTION_TYPE_LOADING });

    if (!isLoggedIn) {
      dispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: [],
      });
      return;
    }

    axios
      .delete(
        `/api/user/history/${id}`,

        {
          headers: { authorization: token },
        }
      )
      .then((res) => {
        setToast({
          show: true,
          content: `Video removed from History`,
          type: "error",
        });
        dispatch({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.history,
        });
      })
      .catch((err) => {
        setToast({
          show: true,
          content: `Error removing video from History`,
          type: "error",
        });
        dispatch({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
  };

  const clearAllHistory = () => {
    dispatch({ type: ACTION_TYPE_LOADING });
    axios
      .delete("/api/user/history/all", {
        headers: { authorization: token },
      })
      .then((res) => {
        setToast({
          show: true,
          content: `History cleared successfully`,
          type: "info",
        });
        dispatch({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.history,
        });
      })
      .catch((err) => {
        setToast({
          show: true,
          content: `Error clearing history`,
          type: "errror",
        });
        dispatch({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);
  return (
    <HistoryContext.Provider
      value={{
        history: state,
        setHistory: dispatch,
        addToHistory,
        removeFromHistory,
        fetchHistory,
        clearAllHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

const useHistory = () => useContext(HistoryContext);
export { useHistory, HistoryProvider };
