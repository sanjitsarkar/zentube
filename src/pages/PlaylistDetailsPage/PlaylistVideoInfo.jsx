import React, { useEffect, useState } from "react";
import Iframe from "react-iframe-click";
import {
  AddToPlaylistIcon,
  LikedIcon,
  WatchLaterIcon,
} from "../../assets/icons";
import { useHistory } from "../../context/HistoryContext";
import { useLikedVideos } from "../../context/LikedVideosContext";
import { usePlaylistModal } from "../../context/PlaylistModalContext";
import { usePlaylist } from "../../context/PlaylistsContext";
import { useWatchLater } from "../../context/WatchLaterContext";
import { convertTimestampToDate } from "../../utils";

const PlaylistVideoInfo = ({ playlist }) => {
  const { likedVideos, addToLikedVideos, removeFromLikedVideos } =
    useLikedVideos();
  const { watchLater, addToWatchLater, removeFromWatchLater } = useWatchLater();
  const [isInWatchLater, setIsInWatchlater] = useState(false);
  const [isInLikedVideos, setIsInLikedVideos] = useState(false);
  const { addToHistory } = useHistory();
  const { removeFromPlaylist, activeVideo, setActiveVideo } = usePlaylist();
  useEffect(() => {
    setActiveVideo(playlist.videos[0]);
  });
  useEffect(() => {
    if (
      watchLater.data.findIndex((element) => element._id == activeVideo._id) !==
      -1
    ) {
      setIsInWatchlater(() => true);
    } else {
      setIsInWatchlater(() => false);
    }
  }, [watchLater]);

  useEffect(() => {
    if (
      likedVideos.data.findIndex(
        (element) => element._id == activeVideo._id
      ) !== -1
    ) {
      setIsInLikedVideos(() => true);
    } else {
      setIsInLikedVideos(() => false);
    }
  }, [likedVideos]);

  const videoId = activeVideo.videoURL.split("=")[1];

  return (
    <div className="w-screen">
      <Iframe
        width="100%"
        height="500px"
        className="bg-black"
        id="iframe"
        src={`https://www.youtube.com/embed/${videoId}`}
        onInferredClick={() => addToHistory(activeVideo)}
        title="YouTube video player"
        frameBorder="0"
      ></Iframe>
      <div className="video-info pt-2 ">
        <div className="pl-2 pr-2">
          <h1 className="card-title">{activeVideo.title}</h1>

          <div className="row items-center w-full mt-05 justify-between">
            <div className="row item-center  gap-1 text-lg">
              <h5 className="o-70 font-semibold">
                {activeVideo.viewCount} views
              </h5>
              <h5 className="o-70 font-semibold">
                {convertTimestampToDate(activeVideo.publishedAt)}
              </h5>
            </div>
            <div className="row item-center  ">
              <button
                className="text-lg row items-center gap-05"
                onClick={() => {
                  isInLikedVideos
                    ? removeFromLikedVideos(activeVideo._id)
                    : addToLikedVideos(activeVideo);
                }}
              >
                <LikedIcon
                  className={`${
                    isInLikedVideos ? "text-tertiary" : "text-light"
                  }`}
                />
                <span>Like</span>
              </button>
              <button
                className="text-lg row items-center gap-05"
                onClick={() => {
                  isInWatchLater
                    ? removeFromWatchLater(activeVideo._id)
                    : addToWatchLater(activeVideo);
                }}
              >
                <WatchLaterIcon
                  className={`${
                    isInWatchLater ? "text-primary" : "text-light"
                  }`}
                />
                <span>Watch Later</span>
              </button>
              <button
                className="text-lg row items-center gap-05"
                onClick={() => {
                  removeFromPlaylist(activeVideo._id, playlist._id);
                }}
              >
                <i className="fa fa-trash-text-tertiary fa-lg"></i>
                <span>Remove from playlist</span>
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="row items-center gap-05 mt-1 flex-nowrap pl-2 pb-2 pt-1">
          <img
            src={activeVideo.creatorImage}
            alt={activeVideo.creatorName}
            className="w-10 h-10"
            id="img-rounded"
          />
          <h4 className="o-70 font-normal channel-name">{video.creatorName}</h4>
        </div>
        <hr />
        <div className="video-desc p-2">
          <p className="o-70">{activeVideo.videoDesc}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaylistVideoInfo;
