import axios from "axios";
import React, { useEffect, createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "../reducers/reducer";
import {
  ACTION_TYPE_FAILURE,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
} from "../utils";
const VideosContext = createContext();

const VideosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getVideos = async () => {
    try {
      const res = await axios.get("/api/videos");
      return { loading: false, data: res.data.videos, error: "" };
    } catch (err) {
      return { loading: false, data: [], error: err.message };
    }
  };
  const filterVideos = (tag) => {
    dispatch({ type: ACTION_TYPE_LOADING });

    getVideos()
      .then((res) => {
        let videos = res.data.filter((video) => {
          if (tag === "All" || (tag && video.tags.includes(tag))) {
            return true;
          }
          return false;
        });
        dispatch({
          type: ACTION_TYPE_SUCCESS,
          payload: videos,
        });
      })
      .catch((err) =>
        dispatch({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        })
      );
  };

  const fetchVideos = () => {
    dispatch({ type: ACTION_TYPE_LOADING });
    axios
      .get("/api/videos")
      .then((res) => {
        dispatch({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.videos,
        });
      })
      .catch((err) => {
        dispatch({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
  };
  useEffect(() => {
    searchVideos();
  }, []);
  return (
    <VideosContext.Provider
      value={{
        videos: state,
        setVideos: dispatch,
        getVideos,
        fetchVideos,
        filterVideos,
      }}
    >
      {children}
    </VideosContext.Provider>
  );
};

const useVideos = () => useContext(VideosContext);
export { useVideos, VideosProvider };
