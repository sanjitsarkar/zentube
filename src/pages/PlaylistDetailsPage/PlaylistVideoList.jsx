import React from "react";
import VideoCard from "../../components/VideoCard.jsx";
import { usePlaylist } from "../../context/PlaylistsContext.jsx";

const PlaylistVideoList = ({ playlist }) => {
  return (
    <div className="mt-3">
      <h4 className="text-xl mb-1 ml-1 text-primary">
        {playlist.videos.length}{" "}
        {playlist.videos.length > 1 ? "videos" : "video"} in this playlist
      </h4>
      <div className=" mt-2 gap-05 video-grid  ">
        {playlist.videos.map((video) => (
          <VideoCard video={video} key={video._id} />
        ))}
      </div>
    </div>
  );
};

export default PlaylistVideoList;
