import React from "react";
import { AddToPlaylistIcon } from "../../assets/icons";
import Loader from "../../components/Loader";
import NotAvailable from "../../components/NotAvailable";
import { usePlaylist } from "../../context";
import { usePlaylistModal } from "../../context/PlaylistModalContext";
import PlaylistCard from "./PlaylistCard";

const PlaylistGrid = () => {
  const { playlists, playlistsInfo } = usePlaylist();
  const { togglePlaylistModal, setShowPlaylistList } = usePlaylistModal();

  return (
    <>
      <div className="row">
        <div
          className="row  gap-05  bg-secondary items-center cursor-pointer p-1 pl-2 pr-2 br-sm"
          onClick={() => {
            togglePlaylistModal();
            setShowPlaylistList(false);
          }}
        >
          <AddToPlaylistIcon className={"w-6"} />

          <span>Create new playlist</span>
        </div>
      </div>
      {playlists.loading && <Loader />}
      <div className="grid mt-3  playlist-grid w-full">
        {!playlists.loading &&
          playlists.data.length > 0 &&
          playlists.data.map((playlist, i) => (
            <PlaylistCard
              playlist={playlist}
              key={playlist._id}
              playlistsInfo={playlistsInfo}
            />
          ))}
      </div>
      {!playlists.loading && playlists.data.length == 0 && (
        <NotAvailable title="Playlist is empty" />
      )}
    </>
  );
};

export default PlaylistGrid;
