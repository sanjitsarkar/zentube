import React, { useEffect } from "react";
import Loader from "../../components/Loader/index.jsx";
import NotAvailable from "../../components/NotAvailable/index.jsx";
import VideoCard from "../../components/VideoCard.jsx";
import { useVideos } from "../../context/VideosContext.jsx";

const VideoGrid = () => {
  const { videos } = useVideos();

  return (
    <>
      {videos.loading && <Loader />}
      <div className="grid  gap-1 video-grid  w-full">
        {!videos.loading &&
          videos.data.length > 0 &&
          videos.data.map((video, i) => (
            <VideoCard video={video} key={video._id} />
          ))}
      </div>
      {!videos.loading && videos.data.length == 0 && (
        <NotAvailable title="Videos not available" />
      )}
    </>
  );
};

export default VideoGrid;
