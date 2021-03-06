import React, { useEffect, useState } from "react";
import {
  AddToPlaylistIcon,
  TrashIcon,
  WatchLaterIcon,
} from "../../assets/icons";
import { useAuth, useWatchLater } from "../../context";
import { usePlaylistModal } from "../../context/PlaylistModalContext";
import { useToast } from "../../context/ToastContext";
import ActionButton from "./ActionButton";

const ActionBar = ({ video, show }) => {
  const { watchLater, addToWatchLater, removeFromWatchLater } = useWatchLater();
  const [isInWatchLater, setIsInWatchlater] = useState(false);
  const { setToast } = useToast();
  const { togglePlaylistModal, setVideo, setShowPlaylistList } =
    usePlaylistModal();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    watchLater.data.forEach((element) => {
      if (element._id == video._id) setIsInWatchlater(() => true);
    });
  }, []);
  return (
    <div className="action-bar absolute r-3 t-05 bg-primary p-1 br-sm bx-sh-primary-3 ">
      <ActionButton
        video={video}
        show={show}
        title={`${
          isInWatchLater ? "Remove from watchlist" : "Add to watch later"
        }`}
        Icon={isInWatchLater ? TrashIcon : WatchLaterIcon}
        onClick={() => {
          isInWatchLater
            ? removeFromWatchLater(video._id)
            : addToWatchLater(video);
        }}
      />
      <ActionButton
        video={video}
        show={show}
        Icon={AddToPlaylistIcon}
        title="Save to playlist"
        onClick={() => {
          if (!isLoggedIn)
            setToast({
              show: true,
              content: "Please login to add video to Playlist",
              type: "warning",
            });
          else {
            togglePlaylistModal();
            setShowPlaylistList(true);
            setVideo(video);
          }
        }}
      />
    </div>
  );
};

export default ActionBar;
