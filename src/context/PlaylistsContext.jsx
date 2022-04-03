import axios from "axios";
import React, { useEffect, createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "../reducers/reducer";
import {
  ACTION_TYPE_FAILURE,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
} from "../utils";
const PlaylistsContext = createContext();

const PlaylistsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchPlaylists = async () => {
    try {
      const res = await axios.get("/api/playlists");
      return { loading: false, data: res.data.Playlists, error: "" };
    } catch (err) {
      return { loading: false, data: [], error: err.message };
    }
  };
  const removePlaylist = (id) => {};
  const addPlaylist = (video) => {};

  const fetchPlaylists = () => {
    dispatch({ type: ACTION_TYPE_LOADING });
    axios
      .get("/api/playlists")
      .then((res) => {
        dispatch({
          type: ACTION_TYPE_SUCCESS,
          payload: res.data.Playlists,
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
    fetchPlaylists();
  }, []);
  return (
    <PlaylistsContext.Provider
      value={{
        playlists: state,
        setPlaylists: dispatch,
        fetchPlaylists,
        filterPlaylists,
      }}
    >
      {children}
    </PlaylistsContext.Provider>
  );
};

const usePlaylists = () => useContext(PlaylistsContext);
export { usePlaylists, PlaylistsProvider };
