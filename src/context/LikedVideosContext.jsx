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
const LikedVideosContext = createContext();

const LikedVideosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { token, isLoggedIn } = useAuth();

  const { setToast } = useToast();

  const fetchLikedVideos = () => {
    dispatch({ type: ACTION_TYPE_LOADING });
    axios
      .get("/api/user/likes")
      .then((res) => {
        dispatch({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.likes,
        });
      })
      .catch((err) => {
        dispatch({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
  };
  const addToLikedVideos = (video) => {
    dispatch({ type: ACTION_TYPE_LOADING });

    if (!isLoggedIn) {
      setToast({
        show: true,
        content: "Please login to like video",
        type: "warning",
      });
      dispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: [],
      });
      return;
    }

    axios
      .post(
        "/api/user/likes",
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
          content: `Video added to Liked Videos`,
          type: "info",
        });
        dispatch({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.likes,
        });
      })
      .catch((err) => {
        setToast({
          show: true,
          content: `Error adding video to Liked Videos`,
          type: "info",
        });
        dispatch({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
  };
  const removeFromLikedVideos = (id) => {
    dispatch({ type: ACTION_TYPE_LOADING });

    if (!isLoggedIn) {
      setToast({
        show: true,
        content: "Please login to dislike video",
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
        `/api/user/likes/${id}`,

        {
          headers: { authorization: token },
        }
      )
      .then((res) => {
        setToast({
          show: true,
          content: `Video removed from Liked Videos`,
          type: "error",
        });
        dispatch({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.likes,
        });
      })
      .catch((err) => {
        setToast({
          show: true,
          content: `Error removing video from Liked Videos`,
          type: "error",
        });
        dispatch({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
  };

  useEffect(() => {
    fetchLikedVideos();
  }, []);
  return (
    <LikedVideosContext.Provider
      value={{
        likedVideos: state,
        setLikedVideos: dispatch,
        addToLikedVideos,
        removeFromLikedVideos,
        fetchLikedVideos,
      }}
    >
      {children}
    </LikedVideosContext.Provider>
  );
};

const useLikedVideos = () => useContext(LikedVideosContext);
export { useLikedVideos, LikedVideosProvider };
