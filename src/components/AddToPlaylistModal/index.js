import React, { useState } from "react";
import { AddToPlaylistIcon, PlaySpeedIcon } from "../../assets/icons";
import { usePlaylistModal } from "../../context/PlaylistModalContext";
import { usePlaylist } from "../../context/PlaylistsContext";
import Loader from "../Loader";

const AddToPlaylistModal = () => {
  const {
    removeFromPlaylist,
    playlists,
    addPlaylist,
    addToPlaylist,
    playlistsInfo,
  } = usePlaylist();
  const [showPlaylistInput, setShowPlaylistInput] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlistDesc, setPlaylistDesc] = useState("");
  const { showPlaylistModal, togglePlaylistModal, video } = usePlaylistModal();

  return (
    <div
      id="playlist-modal"
      className={`modal ${showPlaylistModal ? "modal-open" : ""}`}
    >
      <div className="modal-content ">
        <span
          className="close"
          onClick={() => {
            setShowPlaylistInput(false);
            togglePlaylistModal();
          }}
        >
          &times;
        </span>
        <div className="text-dark">
          <div htmlFor="" className="p-1 pl-2 pr-2">
            Save to
          </div>
          <hr />

          {playlists.data.length > 0 && (
            <ul className="bg-dark-9 overflow-hidden overflow-y-scroll playlist-items">
              {playlists.data.map((playlist) => (
                <div key={playlist._id}>
                  <li className="row items-center justify-between p-1 pl-2 pr-2 gap-1">
                    <label className="checkbox-container flex flex-wrap">
                      <div className="playlist-title">
                        {" "}
                        {playlistsInfo.get(playlist._id).title}
                      </div>

                      <input
                        type="checkbox"
                        checked={
                          playlist.videos.findIndex(
                            (_video) => _video._id === video._id
                          ) === -1
                            ? false
                            : true
                        }
                        onChange={(e) => {
                          if (e.target.checked == false) {
                            removeFromPlaylist(video._id, playlist._id);
                          } else {
                            addToPlaylist(video, playlist._id);
                          }
                        }}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <PlaySpeedIcon
                      className={"text-success"}
                      width={"1.5rem"}
                    />
                  </li>
                  <hr />
                </div>
              ))}
            </ul>
          )}
          <hr />
          <div className="p-2 pl-2 pr-2 bg-black-1 text-dark">
            {playlists.data.length == 0 || showPlaylistInput ? (
              <form
                className="col gap-05 "
                onSubmit={(e) => {
                  e.preventDefault();
                  addPlaylist(playlistTitle, playlistDesc);
                  setShowPlaylistInput(false);
                  setPlaylistTitle("");
                  setPlaylistDesc("");
                  e.target.reset();
                }}
              >
                <input
                  type="text"
                  placeholder="Enter playlist name"
                  className="input input-dark"
                  id="input-dark"
                  defaultValue={playlistTitle}
                  onChange={(e) => setPlaylistTitle(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Enter playlist description"
                  className="input input-dark"
                  id="input-dark"
                  defaultValue={playlistDesc}
                  onChange={(e) => setPlaylistDesc(e.target.value)}
                />
                <button className="btn btn-primary text-md  ">
                  Add playlist
                </button>
              </form>
            ) : (
              <div
                className="row  gap-05 text-light items-center cursor-pointer"
                onClick={() => setShowPlaylistInput(true)}
              >
                <AddToPlaylistIcon className={"w-6"} />

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
