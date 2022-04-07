import React, { useEffect, useState } from "react";
import Iframe from "react-iframe-click";
import {
  AddToPlaylistIcon,
  LikedIcon,
  WatchLaterIcon,
} from "../../assets/icons";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "../../context/HistoryContext";
import { useLikedVideos } from "../../context/LikedVideosContext";
import { usePlaylistModal } from "../../context/PlaylistModalContext";
import { useToast } from "../../context/ToastContext";
import { useWatchLater } from "../../context/WatchLaterContext";
import { convertTimestampToDate } from "../../utils";

const VideoInfo = ({ video }) => {
  const { likedVideos, addToLikedVideos, removeFromLikedVideos } =
    useLikedVideos();
  const { isLoggedIn } = useAuth();
  const { setToast } = useToast();
  const { watchLater, addToWatchLater, removeFromWatchLater } = useWatchLater();
  const [isInWatchLater, setIsInWatchlater] = useState(false);
  const [isInLikedVideos, setIsInLikedVideos] = useState(false);
  const { addToHistory } = useHistory();
  const { togglePlaylistModal, setVideo, setShowPlaylistList } =
    usePlaylistModal();

  useEffect(() => {
    if (
      watchLater.data.findIndex((element) => element._id == video._id) !== -1
    ) {
      setIsInWatchlater(() => true);
    } else {
      setIsInWatchlater(() => false);
    }
  }, [watchLater]);

  useEffect(() => {
    if (
      likedVideos.data.findIndex((element) => element._id == video._id) !== -1
    ) {
      setIsInLikedVideos(() => true);
    } else {
      setIsInLikedVideos(() => false);
    }
  }, [likedVideos]);

  const videoId = video.videoURL.split("=")[1];

  return (
    <div className="w-screen">
      <Iframe
        width="100%"
        height="500px"
        className="bg-black"
        id="iframe"
        src={`https://www.youtube.com/embed/${videoId}`}
        onInferredClick={() => addToHistory(video)}
        title="YouTube video player"
        frameBorder="0"
      ></Iframe>
      <div className="video-info pt-2 ">
        <div className="pl-2 pr-2">
          <h1 className="card-title">{video.title}</h1>

          <div className="row items-center w-full mt-05 justify-between">
            <div className="row item-center  gap-1 text-lg">
              <h5 className="o-70 font-semibold">{video.viewCount} views</h5>
              <h5 className="o-70 font-semibold">
                {convertTimestampToDate(video.publishedAt)}
              </h5>
            </div>
            <div className="row item-center  ">
              <button
                className="text-lg row items-center gap-05"
                onClick={() => {
                  isInLikedVideos
                    ? removeFromLikedVideos(video._id)
                    : addToLikedVideos(video);
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
                    ? removeFromWatchLater(video._id)
                    : addToWatchLater(video);
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
                  if (!isLoggedIn)
                    setToast({
                      show: true,
                      content: "Please login to add video to Playlist",
                      type: "warning",
                    });
                  else {
                    setShowPlaylistList(true);
                    setVideo(video);
                    togglePlaylistModal();
                  }
                }}
              >
                <AddToPlaylistIcon />
                <span>Add to playlist</span>
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="row items-center gap-05 mt-1 flex-nowrap pl-2 pb-2 pt-1">
          <img
            src={video.creatorImage}
            alt={video.creatorName}
            className="w-10 h-10"
            id="img-rounded"
          />
          <h4 className="o-70 font-normal channel-name">{video.creatorName}</h4>
        </div>
        <hr />
        <div className="video-desc p-2">
          <p className="o-70">{video.videoDesc}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
