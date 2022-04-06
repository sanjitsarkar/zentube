import axios from "axios";
import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useReducer,
} from "react";
import { initialState, reducer } from "../reducers/reducer";
import {
  ACTION_TYPE_FAILURE,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
} from "../utils";
const VideosContext = createContext();

const VideosProvider = ({ children }) => {
  const [videos, dispatchVideos] = useReducer(reducer, initialState);
  const [video, dispatchVideo] = useReducer(reducer, initialState);

  const getVideos = async () => {
    try {
      const res = await axios.get("/api/videos");
      return { loading: false, data: res.data.videos, error: "" };
    } catch (err) {
      return { loading: false, data: [], error: err.message };
    }
  };
  const filterVideos = (filters) => {
    dispatchVideos({ type: ACTION_TYPE_LOADING });

    getVideos()
      .then((res) => {
        let videos = res.data.filter((video) => {
          if (
            filters.tag === "All" ||
            (filters.tag && video.tags.includes(filters.tag))
          ) {
            return true;
          }
          if (
            filters.category === "All" ||
            (filters.category && video.category.includes(filters.category))
          ) {
            return true;
          }
          return false;
        });
        dispatchVideos({
          type: ACTION_TYPE_SUCCESS,
          payload: videos,
        });
      })
      .catch((err) =>
        dispatchVideos({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        })
      );
  };
  const fetchVideoInfo = (videoId) => {
    dispatchVideo({ type: ACTION_TYPE_LOADING });
    axios
      .get(`/api/video/${videoId}`)
      .then((res) => {
        dispatchVideo({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.video,
        });
      })
      .catch((err) => {
        dispatchVideo({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
  };
  const fetchVideos = () => {
    dispatchVideos({ type: ACTION_TYPE_LOADING });
    axios
      .get("/api/videos")
      .then((res) => {
        dispatchVideos({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.videos,
        });
      })
      .catch((err) => {
        dispatchVideos({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
  };
  useEffect(() => {
    fetchVideos();
  }, []);
  return (
    <VideosContext.Provider
      value={{
        videos,
        setVideos: dispatchVideos,
        getVideos,
        fetchVideos,
        filterVideos,
        video,
        setVideo: dispatchVideo,
        fetchVideoInfo,
      }}
    >
      {children}
    </VideosContext.Provider>
  );
};

const useVideos = () => useContext(VideosContext);
export { useVideos, VideosProvider };
