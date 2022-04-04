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
const WatchLaterContext = createContext();

const WatchLaterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { token, isLoggedIn } = useAuth();

  const { setToast } = useToast();

  const fetchWatchLater = () => {
    dispatch({ type: ACTION_TYPE_LOADING });
    axios
      .get("/api/user/watchlater", {
        headers: { authorization: token },
      })
      .then((res) => {
        dispatch({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.watchlater,
        });
      })
      .catch((err) => {
        dispatch({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
  };
  const addToWatchLater = (video) => {
    dispatch({ type: ACTION_TYPE_LOADING });

    if (!isLoggedIn) {
      setToast({
        show: true,
        content: "Please login to add video to Watch Later",
        type: "warning",
      });
      dispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: [],
      });
      return;
    }
    if (state.data.find((item) => item._id === video._id)) {
      setToast({
        show: true,
        content: `Video already added to the Watch Later`,
        type: "info",
      });
    } else {
      axios
        .post(
          "/api/user/watchlater",
          JSON.stringify({
            video,
          }),
          {
            headers: { authorization: token },
          }
        )
        .then((res) => {
          setToast({
            show: true,
            content: `Video added to Watch Later`,
            type: "info",
          });
          dispatch({
            type: ACTION_TYPE_SUCCESS,
            payload: res.data.watchlater,
          });
        })
        .catch((err) => {
          setToast({
            show: true,
            content: `Error adding video to Watch Later`,
            type: "info",
          });
          dispatch({
            type: ACTION_TYPE_FAILURE,
            payload: err.message,
          });
        });
    }
  };
  const removeFromWatchLater = (id) => {
    dispatch({ type: ACTION_TYPE_LOADING });

    if (!isLoggedIn) {
      setToast({
        show: true,
        content: "Please login to add video to Watch Later",
        type: "warning",
      });
      dispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: [],
      });
      return;
    }

    axios
      .delete(
        `/api/user/watchlater/${id}`,

        {
          headers: { authorization: token },
        }
      )
      .then((res) => {
        setToast({
          show: true,
          content: `Video removed from Watch Later`,
          type: "error",
        });
        dispatch({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.watchlater,
        });
      })
      .catch((err) => {
        setToast({
          show: true,
          content: `Error removing video from Watch Later`,
          type: "error",
        });
        dispatch({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
  };

  useEffect(() => {
    fetchWatchLater();
  }, []);
  return (
    <WatchLaterContext.Provider
      value={{
        watchLater: state,
        setWatchLater: dispatch,
        addToWatchLater,
        removeFromWatchLater,
        fetchWatchLater,
      }}
    >
      {children}
    </WatchLaterContext.Provider>
  );
};

const useWatchLater = () => useContext(WatchLaterContext);
export { useWatchLater, WatchLaterProvider };
