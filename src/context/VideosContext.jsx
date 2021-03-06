import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { initialState, reducer } from "../reducers/reducer";
import {
  ACTION_TYPE_FAILURE,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
  shuffle,
} from "../utils";
const VideosContext = createContext();

const VideosProvider = ({ children }) => {
  const [videos, dispatchVideos] = useReducer(reducer, initialState);
  const [relatedVideos, dispatchRelatedVideos] = useReducer(
    reducer,
    initialState
  );
  const [filters, setFilters] = useState({
    category: "All",
    search: "",
  });
  const [videoInfo, dispatchVideoInfo] = useReducer(reducer, initialState);

  const getVideos = async () => {
    try {
      const res = await axios.get("/api/videos");
      return { loading: false, data: res.data.videos, error: "" };
    } catch (err) {
      return { loading: false, data: [], error: err.message };
    }
  };
  const searchVideos = async (searchTerm) => {
    dispatchVideos({ type: ACTION_TYPE_LOADING });
    try {
      const res = await getVideos();

      dispatchVideos({
        type: ACTION_TYPE_SUCCESS,
        payload: res.data.filter((video) =>
          video.title.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      });
    } catch (err) {
      dispatchVideos({
        type: ACTION_TYPE_FAILURE,
        payload: err.message,
      });
    }
  };
  const filterVideos = (filters) => {
    if (filters.type === "related") {
      dispatchRelatedVideos({ type: ACTION_TYPE_LOADING });
    } else if (filters.type === "video") {
      dispatchVideos({ type: ACTION_TYPE_LOADING });
    }

    getVideos()
      .then((res) => {
        let videos = res.data.filter((video) => {
          if (
            filters.category === "All" ||
            (filters.category && video.category === filters.category)
          ) {
            return true;
          }
          if (
            filters.tag === "All" ||
            (filters.tag && video.tag.includes(filters.tag))
          ) {
            return true;
          }
          return false;
        });

        if (filters.type === "related") {
          dispatchRelatedVideos({ type: ACTION_TYPE_SUCCESS, payload: videos });
        } else if (filters.type === "video") {
          if (filters.search) {
            videos = videos.filter((video) =>
              video.title.toLowerCase().includes(filters.search.toLowerCase())
            );
          }
          dispatchVideos({ type: ACTION_TYPE_SUCCESS, payload: videos });
        }
      })
      .catch((err) => {
        if (filters.type === "related") {
          dispatchRelatedVideos({
            type: ACTION_TYPE_FAILURE,
            payload: err.message,
          });
        } else if (filters.type === "video") {
          dispatchVideos({
            type: ACTION_TYPE_FAILURE,
            payload: err.message,
          });
        }
      });
  };
  const fetchVideoInfo = (videoId) => {
    dispatchVideoInfo({ type: ACTION_TYPE_LOADING });
    axios
      .get(`/api/video/${videoId}`)
      .then((res) => {
        dispatchVideoInfo({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.video,
        });
      })
      .catch((err) => {
        dispatchVideoInfo({
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
          payload: shuffle(res.data.videos),
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
        searchVideos,
        setVideos: dispatchVideos,
        getVideos,
        fetchVideos,
        filterVideos,
        videoInfo,
        relatedVideos,
        setVideo: dispatchVideoInfo,
        fetchVideoInfo,
        filters,
        setFilters,
      }}
    >
      {children}
    </VideosContext.Provider>
  );
};

const useVideos = () => useContext(VideosContext);
export { useVideos, VideosProvider };
