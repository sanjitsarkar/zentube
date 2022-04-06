import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import { usePlaylist } from "../../context/PlaylistsContext";
import { ACTION_TYPE_SUCCESS } from "../../utils";
import PlaylistInfo from "./PlaylistInfo";
import PlaylistVideoInfo from "./PlaylistVideoInfo";
import PlaylistVideoList from "./PlaylistVideoList";

const PlaylistDetailsPage = () => {
  const location = useLocation();
  const {
    fetchPlaylists,
    playlistsInfo,
    playlists,
    setPlaylistVideos,
    playlistVideos,
  } = usePlaylist();
  useEffect(() => {
    let pathName = location.pathname.split("/");
    let playlistId = pathName[pathName.length - 1];
    setPlaylistVideos({
      type: ACTION_TYPE_SUCCESS,
      payload: playlists.find((_playlist) => _playlist._id === playlistId),
    });
  }, [location]);
  useEffect(() => {}, [playlistVideos]);
  return (
    <Layout>
      {!playlistVideos.loading && <Loader />}

      {/* {!playlistVideos.loading &&
        playlistVideos.data &&
        playlistVideos.data.videos.length > 0 && (
          <PlaylistVideoInfo playlist={playlistVideos.data} />
        )} */}
      <div className="col w-2-6">
        <PlaylistInfo
          playlistVideos={playlistVideos}
          playlistsInfo={playlistsInfo}
        />
        {!playlistVideos.loading &&
          playlistVideos.data &&
          playlistVideos.data.videos > 0 && <PlaylistVideoList />}
      </div>
    </Layout>
  );
};

export default PlaylistDetailsPage;
