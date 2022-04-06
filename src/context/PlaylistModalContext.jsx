import React, { useState, createContext, useContext } from "react";

const PlaylistModalContext = createContext();

const PlaylistModalProvider = ({ children }) => {
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showPlaylistList, setShowPlaylistList] = useState(true);
  const [video, setVideo] = useState({});
  const togglePlaylistModal = () => {
    setShowPlaylistModal(!showPlaylistModal);
  };

  return (
    <PlaylistModalContext.Provider
      value={{
        showPlaylistList,
        setShowPlaylistList,
        showPlaylistModal,
        setShowPlaylistModal,
        togglePlaylistModal,
        video,
        setVideo,
      }}
    >
      {children}
    </PlaylistModalContext.Provider>
  );
};

const usePlaylistModal = () => useContext(PlaylistModalContext);
export { usePlaylistModal, PlaylistModalProvider };
