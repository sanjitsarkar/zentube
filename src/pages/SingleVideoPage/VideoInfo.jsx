import React, { useEffect, useState } from "react";
import {
  AddToPlaylistIcon,
  LikedIcon,
  WatchLaterIcon,
} from "../../assets/icons";
import { useLikedVideos } from "../../context/LikedVideosContext";
import { useWatchLater } from "../../context/WatchLaterContext";
import { convertViewCount, timeSince } from "../../utils";

const VideoInfo = ({ video }) => {
  const { likedVideos, addToLikedVideos, removeFromLikedVideos } =
    useLikedVideos();
  const { watchLater, addToWatchLater, removeFromWatchLater } = useWatchLater();
  const [isInWatchLater, setIsInWatchlater] = useState(false);
  const [isInLikedVideos, setIsInLikedVideos] = useState(false);

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
      <iframe
        width="100%"
        height="500px"
        className="bg-black"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
      ></iframe>
      <div className="video-info pt-2 ">
        <div className="pl-2 pr-2">
          <h1 className="card-title">{video.title}</h1>

          <div className="row items-center w-full mt-05 justify-between">
            <div className="row item-center  gap-1 text-lg">
              <h5 className="o-70 font-semibold">
                {convertViewCount(video.viewCount)} views
              </h5>
              <h5 className="o-70 font-semibold">
                {timeSince(video.publishedAt)} ago
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
              <button className="text-lg row items-center gap-05">
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
