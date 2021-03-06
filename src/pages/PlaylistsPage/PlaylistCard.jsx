import React from "react";
import { Link } from "react-router-dom";
import { PlaylistPlayIcon } from "../../assets/icons";
import { usePlaylist } from "../../context";

const PlaylistCard = ({ playlist, playlistsInfo }) => {
  const { removePlaylist } = usePlaylist();
  return (
    <div className="playlist-card  bg-black-6 br-sm ">
      <Link to={`/playlists/${playlist._id}`}>
        <div className="card-top relative ">
          <div className="right bg-dark-8 ">
            {playlist.videos.length > 0 ? (
              <img
                src={playlist.videos[0].thumbNail}
                alt={playlist.videos[0].title}
              />
            ) : (
              <img
                src="https://booyah.live/ssr/_next/static/images/empty-vod-dark-mode.404178ec.png"
                alt="Not Available"
              />
            )}
            <div className="col absolute r-0  b-0 p-2 w-2-5 bg-black-3 h-full justify-center items-center">
              <span>{playlist.videos.length}</span>
              <PlaylistPlayIcon />
            </div>
          </div>
        </div>
      </Link>
      <div className="card-bottom p-2 row justify-between flex-nowrap gap-1">
        <div className="col">
          <h3 className="text-primary playlist-title">
            {playlistsInfo.get(playlist._id).title}
          </h3>
          <span>View Playlist</span>
        </div>
        <div
          className=" cursor-pointer button"
          onClick={() => removePlaylist(playlist._id)}
        >
          <i className="fa fa-trash fa-lg text-tertiary"></i>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
