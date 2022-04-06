import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import NotAvailable from "../../components/NotAvailable";
import { usePlaylist } from "../../context/PlaylistsContext";
import { ACTION_TYPE_SUCCESS } from "../../utils";
import PlaylistInfo from "./PlaylistInfo";
import PlaylistVideoInfo from "./PlaylistVideoInfo";
import PlaylistVideoList from "./PlaylistVideoList";

const PlaylistDetailsPage = () => {
  const location = useLocation();
  const { playlistsInfo, playlists, setPlaylistVideos, playlistVideos } =
    usePlaylist();
  useEffect(() => {
    let pathName = location.pathname.split("/");
    let playlistId = pathName[pathName.length - 1];
    setPlaylistVideos({
      type: ACTION_TYPE_SUCCESS,
      payload: playlists.data.find((_playlist) => _playlist._id === playlistId),
    });
  }, [location]);
  return (
    <Layout>
      <div className="col">
        {playlists.loading && <Loader />}

        {!playlistVideos.loading &&
        playlistVideos.data &&
        playlistVideos.data.videos.length > 0 ? (
          <>
            <PlaylistInfo
              playlistId={playlistVideos.data._id}
              playlistsInfo={playlistsInfo}
            />
            <div>
              <PlaylistVideoInfo playlist={playlistVideos.data} />
              <PlaylistVideoList playlist={playlistVideos.data} />
            </div>
          </>
        ) : (
          <div className="text-center col  items-center">
            <NotAvailable title="No video is available in the playlist" />
            <Link to="/" className="btn btn-primary w-fit mt-2 ">
              Go to Home
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PlaylistDetailsPage;
