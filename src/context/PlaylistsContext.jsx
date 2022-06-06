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
  callApi,
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
  const { isLoggedIn } = useAuth();
  const [activeVideo, setActiveVideo] = useState();
  const { setToast } = useToast();
  const fetchPlaylist = async () => {
    dispatchPlaylists({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("get", "playlists", true);
      dispatchPlaylists({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data.playlists,
      });
    } catch (err) {
      dispatchPlaylists({
        type: ACTION_TYPE_FAILURE,
        payload: err.message,
      });
    }
  };
  const fetchPlaylistVideos = async (playlistId) => {
    dispatchPlaylistVideos({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("get", `playlists/${playlistId}`, true);
      dispatchPlaylistVideos({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data.playlist,
      });
    } catch (err) {
      dispatchPlaylistVideos({
        type: ACTION_TYPE_FAILURE,
        payload: err.message,
      });
    }
  };

  const addPlaylist = async (title, description = "") => {
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
    dispatchPlaylists({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("post", "playlists", true, {
        title,
        description,
      });

      setToast({
        show: true,
        content: "Playlist added successfully",
        type: "info",
      });
      let map = playlistsInfo;
      map.set(result.data.playlists[result.data.playlists.length - 1]._id, {
        title,
        description,
      });
      setPlaylistsInfo(() => map);
      dispatchPlaylists({
        type: ACTION_TYPE_SUCCESS,
        payload: result.data.playlists,
      });
    } catch (err) {
      setToast({
        show: true,
        content: "Error adding playlist",
        type: "error",
      });
      dispatchPlaylists({
        type: ACTION_TYPE_FAILURE,
        payload: err.message,
      });
    }
  };
  const removePlaylist = async (playlistId) => {
    dispatchPlaylists({ type: ACTION_TYPE_LOADING });
    try {
      const result = await callApi("delete", `playlists/${playlistId}`, true);
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
        payload: result.data.playlists,
      });
    } catch (err) {
      setToast({
        show: true,
        content: "Error removing playlist",
        type: "error",
      });
      dispatchPlaylists({
        type: ACTION_TYPE_FAILURE,
        payload: err.message,
      });
    }
  };
  const addToPlaylist = async (video, id) => {
    if (!isLoggedIn) {
      setToast({
        show: true,
        content: "Please login to add video to Playlist",
        type: "warning",
      });
      return;
    }
    try {
      await callApi("post", `playlists/${id}`, true, { video });
      setToast({
        show: true,
        content: `Video added to Playlist ${playlistsInfo.get(id).title}`,
        type: "info",
      });

      await fetchPlaylist();
    } catch (err) {
      setToast({
        show: true,
        content: `Error adding to Playlist ${err.message}`,
        type: "info",
      });
    }
  };
  const removeFromPlaylist = async (videoId, playlistId) => {
    dispatchPlaylistVideos({ type: ACTION_TYPE_LOADING });

    if (!isLoggedIn) {
      setToast({
        show: true,
        content: "Please login to add video to Playlist",
        type: "warning",
      });
      return;
    }
    try {
      await callApi("delete", `playlists/${playlistId}/${videoId}`, true);
      setToast({
        show: true,
        content: `Video removed from Playlist ${
          playlistsInfo.get(playlistId).title
        }`,
        type: "error",
      });
      await fetchPlaylist();
    } catch (err) {
      setToast({
        show: true,
        content: `Error removing from Playlist ${
          playlistsInfo.get(playlistId).title
        }`,
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);
  return (
    <PlaylistContext.Provider
      value={{
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
        activeVideo,
        setActiveVideo,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylist = () => useContext(PlaylistContext);
export { usePlaylist, PlaylistProvider };
