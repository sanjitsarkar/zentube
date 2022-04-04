import React, { useEffect, useState } from "react";
import { WatchLaterIcon } from "../../assets/icons";
import { usePlaylistModal } from "../../context/PlaylistModalContext";
import { usePlaylist } from "../../context/PlaylistsContext";

const AddToPlaylistModal = () => {
  const {
    getPlaylist,
    playlists,
    playlistVideos,
    addPlaylist,
    addToPlaylist,
    fetchPlaylist,
  } = usePlaylist();
  const [checkedList, setCheckedList] = useState([]);
  const [showPlaylistInput, setShowPlaylistInput] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const { showPlaylistModal, togglePlaylistModal, videoId } =
    usePlaylistModal();
  useEffect(() => {
    playlists.data.map((playlist, i) => {
      setPlaylistId(() => playlist._id);
    });
  }, [playlists]);

  useEffect(async () => {
    await getPlaylist(playlistId);
  }, [playlistId]);
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
            <li className="row items-center justify-between p-1 pl-2 pr-2">
              <label className="checkbox-container">
                Watch Later
                <input
                  defaultValue="Watch Later"
                  type="checkbox"
                  onChange={(e) => {
                    setCheckedList((_checkedList) => [
                      ...checkedList,
                      e.target.value,
                    ]);

                    addToPlaylist("1", videoId);
                    togglePlaylistModal();
                  }}
                />
                <span className="checkmark"></span>
              </label>
              <WatchLaterIcon className="text-primary" />
            </li>
          </ul>
          <hr />
          <div className="p-1 pl-2 pr-2">
            {showPlaylistInput ? (
              <form
                className="col gap-05 "
                onSubmit={(e) => {
                  e.preventDefault();
                  addPlaylist(playlistTitle);
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
