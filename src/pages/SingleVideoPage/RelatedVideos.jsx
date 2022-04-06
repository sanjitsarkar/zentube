import React, { useEffect } from "react";
import Loader from "../../components/Loader";
import NotAvailable from "../../components/NotAvailable";
import VideoCard from "../../components/VideoCard.jsx";
import { useVideos } from "../../context/VideosContext";

const RelatedVideos = ({ category, videoId }) => {
  const { filterVideos, videos } = useVideos();
  useEffect(async () => {
    await filterVideos({ category });
  }, [category]);
  return (
    <div className="mt-3">
      <h3>Related Videos</h3>
      <div className={`btn font-bold  btn-primary tag mt-2`}>{category}</div>

      {videos.loading && <Loader />}
      <div className=" mt-3 gap-05 video-grid  ">
        {!videos.loading &&
          videos.data.length > 0 &&
          videos.data.map((video, i) => {
            if (video._id !== videoId)
              return <VideoCard video={video} key={video._id} />;
          })}
      </div>
      {!videos.loading && videos.data.length == 0 && (
        <NotAvailable title="Videos not available" />
      )}
    </div>
  );
};

export default RelatedVideos;
