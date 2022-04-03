import React, { useState, createContext, useContext } from "react";

const PlaylistModalContext = createContext();

const PlaylistModalProvider = ({ children }) => {
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [videoId, setVideoId] = useState("");
  const togglePlaylistModal = () => {
    setShowPlaylistModal(!showPlaylistModal);
  };

  return (
    <PlaylistModalContext.Provider
      value={{
        showPlaylistModal,
        setShowPlaylistModal,
        togglePlaylistModal,
        videoId,
        setVideoId,
      }}
    >
      {children}
    </PlaylistModalContext.Provider>
  );
};

const usePlaylistModal = () => useContext(PlaylistModalContext);
export { usePlaylistModal, PlaylistModalProvider };
