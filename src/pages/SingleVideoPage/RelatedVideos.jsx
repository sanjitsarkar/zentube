import React, { useEffect } from "react";
import Loader from "../../components/Loader";
import VideoCard from "../../components/VideoCard.jsx";
import { useVideos } from "../../context";

const RelatedVideos = ({ category, videoId }) => {
  const { filterVideos, relatedVideos } = useVideos();
  useEffect(async () => {
    await filterVideos({ category, type: "related" });
  }, []);
  return (
    <div className="mt-3">
      <h3>Related Videos</h3>
      <div
        className={`w-max font-bold  btn-primary tag mt-2 p-05 pl-1 pr-1 br-sm`}
      >
        {category}
      </div>

      {relatedVideos.loading && <Loader />}
      <div className="mt-3 gap-05 related-video-grid">
        {!relatedVideos.loading &&
          relatedVideos.data.length > 0 &&
          relatedVideos.data.map((video, i) => {
            if (video._id !== videoId)
              return <VideoCard video={video} key={video._id} small={true} />;
          })}
      </div>
    </div>
  );
};

export default RelatedVideos;
