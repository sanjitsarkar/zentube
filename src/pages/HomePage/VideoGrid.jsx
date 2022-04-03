import React, { useEffect } from "react";
import Loader from "../../components/Loader/index.jsx";
import VideoCard from "../../components/VideoCard.jsx";
import { useVideos } from "../../context/VideosContext.jsx";

const VideoGrid = () => {
  const { videos } = useVideos();

  return (
    <div className="row flex-wrap mt-3 gap-1">
      {videos.loading && <Loader />}
      {!videos.loading &&
        videos.data.length > 0 &&
        videos.data.map((video, i) => (
          <VideoCard video={video} key={video._id} />
        ))}
      {!videos.loading && videos.data.length == 0 && (
        <h2 className="w-full h-full grid place-content-center">
          No Videos Available
        </h2>
      )}
    </div>
  );
};

export default VideoGrid;
