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
const PlaylistContext = createContext();

const PlaylistProvider = ({ children }) => {
  const [playlistVideos, dispatchPlaylistVideos] = useReducer(
    reducer,
    initialState
  );
  const [playlists, dispatchPlaylists] = useReducer(reducer, initialState);
  const { token, isLoggedIn } = useAuth();

  const { setToast } = useToast();

  const fetchPlaylist = () => {
    dispatchPlaylists({ type: ACTION_TYPE_LOADING });
    axios
      .get("/api/user/playlists", {
        headers: { authorization: token },
      })
      .then((res) => {
        dispatchPlaylists({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.playlists,
        });
      })
      .catch((err) => {
        dispatchPlaylists({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
  };
  const fetchPlaylistVideos = (playlistId) => {
    dispatchPlaylistVideos({ type: ACTION_TYPE_LOADING });
    axios
      .get(`/api/user/playlists/${playlistId}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        dispatchPlaylistVideos({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.playlist,
        });
      })
      .catch((err) => {
        dispatchPlaylistVideos({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
  };
  const getPlaylist = (playlistId) => {
    dispatchPlaylistVideos({ type: ACTION_TYPE_LOADING });
    axios
      .get(`/api/user/playlists/${playlistId}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        dispatchPlaylistVideos({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.playlist,
        });
      })
      .catch((err) => {
        dispatchPlaylistVideos({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
  };

  const addPlaylist = (title, description = "") => {
    dispatchPlaylists({ type: ACTION_TYPE_LOADING });
    axios
      .post(
        "/api/user/playlists",
        JSON.stringify({
          title,
          description,
        }),
        {
          headers: { authorization: token },
        }
      )
      .then((res) => {
        setToast({
          show: true,
          content: "Playlist added successfully",
          type: "info",
        });
        dispatchPlaylists({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.playlists,
        });
      })
      .catch((err) => {
        setToast({
          show: true,
          content: "Error adding playlist",
          type: "error",
        });
        dispatchPlaylists({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
  };
  const removePlaylist = (playlistId) => {
    dispatchPlaylists({ type: ACTION_TYPE_LOADING });
    axios
      .remove(`/api/user/playlists/${playlistId}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        setToast({
          show: true,
          content: "Playlist removed successfully",
          type: "info",
        });
        dispatchPlaylists({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.playlists,
        });
      })
      .catch((err) => {
        setToast({
          show: true,
          content: "Error removing playlist",
          type: "error",
        });
        dispatchPlaylists({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
  };
  const addToPlaylist = (video, id) => {
    dispatchPlaylistVideos({ type: ACTION_TYPE_LOADING });

    if (!isLoggedIn) {
      setToast({
        show: true,
        content: "Please login to add video to Playlist",
        type: "warning",
      });
      dispatchPlaylistVideos({
        type: ACTION_TYPE_SUCCESS,
        payload: [],
      });
      return;
    }

    axios
      .post(
        `/api/user/playlists/${id}`,
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
          content: `Video added to Playlist`,
          type: "info",
        });
        dispatchPlaylistVideos({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.playlist,
        });
      })
      .catch((err) => {
        setToast({
          show: true,
          content: `Error adding to Playlist`,
          type: "info",
        });
        dispatchPlaylistVideos({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
  };
  const removeFromPlaylist = (videoId, playlistId) => {
    dispatchPlaylistVideos({ type: ACTION_TYPE_LOADING });

    if (!isLoggedIn) {
      setToast({
        show: true,
        content: "Please login to add video to Playlist",
        type: "warning",
      });
      dispatchPlaylistVideos({
        type: ACTION_TYPE_SUCCESS,
        payload: [],
      });
      return;
    }

    axios
      .delete(
        `/api/user/playlists/${playlistId}/${videoId}`,

        {
          headers: { authorization: token },
        }
      )
      .then((res) => {
        setToast({
          show: true,
          content: `Video removed from Playlist`,
          type: "error",
        });
        dispatchPlaylistVideos({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.playlist,
        });
      })
      .catch((err) => {
        setToast({
          show: true,
          content: `Error removed to Playlist`,
          type: "error",
        });
        dispatchPlaylistVideos({
          type: ACTION_TYPE_FAILURE,
          payload: err.message,
        });
      });
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);
  return (
    <PlaylistContext.Provider
      value={{
        getPlaylist,
        playlistVideos,
        setPlaylistVideos: dispatchPlaylistVideos,
        playlists,
        setPlaylists: dispatchPlaylists,
        addPlaylist,
        removePlaylist,
        addToPlaylist,
        fetchPlaylistVideos,
        removeFromPlaylist,
        fetchPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylist = () => useContext(PlaylistContext);
export { usePlaylist, PlaylistProvider };
