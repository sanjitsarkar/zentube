import axios from "axios";
import React, {
  useEffect,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";
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
  const [playlistsInfo, setPlaylistsInfo] = useState(new Map());
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

    if (
      playlists.data.findIndex(
        (_playlist) => playlistsInfo.get(_playlist._id).title === title
      ) !== -1
    ) {
      setToast({
        show: true,
        content: "Playlist with this name already exists",
        type: "error",
      });
      dispatchPlaylists({
        type: ACTION_TYPE_FAILURE,
        payload: "Playlist with this name already exists",
      });
      return;
    }
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
        let map = playlistsInfo;
        map.set(res.data.playlists[res.data.playlists.length - 1]._id, {
          title,
          description,
        });
        setPlaylistsInfo(() => map);
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
      .delete(`/api/user/playlists/${playlistId}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        setToast({
          show: true,
          content: "Playlist removed successfully",
          type: "info",
        });
        const map = playlistsInfo;
        map.delete(playlistId);
        setPlaylistsInfo(map);
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
        type: ACTION_TYPE_FAILURE,
        payload: "Please login to add video to Playlist",
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
          content: `Video added to Playlist ${playlistsInfo.get(id).title}`,
          type: "info",
        });
        dispatchPlaylistVideos({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.playlist,
        });
        fetchPlaylist();
      })
      .catch((err) => {
        setToast({
          show: true,
          content: `Error adding to Playlist ${err.message}`,
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
        type: ACTION_TYPE_FAILURE,
        payload: "Please login to add video to Playlist",
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
          content: `Video removed from Playlist ${playlistsInfo.get(id).title}`,
          type: "error",
        });
        dispatchPlaylistVideos({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.playlist,
        });
        fetchPlaylist();
      })
      .catch((err) => {
        setToast({
          show: true,
          content: `Error removing from Playlist ${
            playlistsInfo.get(playlistId).title
          }`,
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
        playlistsInfo,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylist = () => useContext(PlaylistContext);
export { usePlaylist, PlaylistProvider };
