import React, { useEffect, useState } from "react";
import { WatchLaterIcon } from "../../assets/icons";
import { usePlaylistModal } from "../../context/PlaylistModalContext";
import { usePlaylist } from "../../context/PlaylistsContext";

const AddToPlaylistModal = () => {
  const {
    fetchPlaylist,
    removeFromPlaylist,
    playlists,
    addPlaylist,
    addToPlaylist,
  } = usePlaylist();
  const [checkedList, setCheckedList] = useState([]);
  const [showPlaylistInput, setShowPlaylistInput] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const { showPlaylistModal, togglePlaylistModal, video } = usePlaylistModal();

  return (
    <div
      id="playlist-modal"
      className={`modal ${showPlaylistModal ? "modal-open" : ""}`}
    >
      <div className="modal-content">
        <span className="close" onClick={togglePlaylistModal}>
          &times;
        </span>
        <div className="text-dark">
          <div htmlFor="" className="p-1 pl-2 pr-2">
            Save to
          </div>
          <hr />

          <ul>
            {playlists.data.map((playlist) => (
              <li
                className="row items-center justify-between p-1 pl-2 pr-2"
                key={playlist._id}
              >
                <label className="checkbox-container">
                  {playlist._id}

                  <input
                    defaultValue="Watch Later"
                    type="checkbox"
                    checked={
                      playlist.videos.findIndex(
                        (_video) => _video._id === video._id
                      ) === -1
                        ? false
                        : true
                    }
                    onChange={(e) => {
                      setCheckedList((_checkedList) => [
                        ...checkedList,
                        e.target.value,
                      ]);
                      console.log("checked", e.target.checked);
                      if (e.target.checked == false) {
                        removeFromPlaylist(video._id, playlist._id);
                      } else {
                        addToPlaylist(video, playlist._id);
                      }
                    }}
                  />
                  <span className="checkmark"></span>
                </label>
              </li>
            ))}
          </ul>
          <hr />
          <div className="p-1 pl-2 pr-2">
            {showPlaylistInput ? (
              <form
                className="col gap-05 "
                onSubmit={(e) => {
                  e.preventDefault();
                  addPlaylist(playlistTitle);
                  setPlaylistTitle("");
                }}
              >
                <input
                  type="text"
                  placeholder="Enter playlist name"
                  className="input input-success"
                  defaultValue={playlistTitle}
                  onChange={(e) => setPlaylistTitle(e.target.value)}
                  required
                />
                <button className="btn btn-dark text-md  ">Add playlist</button>
              </form>
            ) : (
              <div
                className="row gap-05 items-center cursor-pointer"
                onClick={() => setShowPlaylistInput(true)}
              >
                <i className="fa fa-add"></i>
                <span>Create new playlist</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToPlaylistModal;
