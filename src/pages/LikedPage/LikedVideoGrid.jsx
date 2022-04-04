import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { useLikedVideos } from "../../context/LikedVideosContext";
import { useNav } from "../../context/NavContext";
import LikedVideoCard from "./LikedVideoCard";

const LikedVideoGrid = () => {
  const { setActiveItem } = useNav();
  const { likedVideos } = useLikedVideos();
  useEffect(() => {
    setActiveItem("Liked Videos");
  });
  return (
    <>
      {likedVideos.loading && <Loader />}
      <div className="grid mt-3 gap-1 video-grid  w-full">
        {!likedVideos.loading &&
          likedVideos.data.length > 0 &&
          likedVideos.data.map((video, i) => (
            <LikedVideoCard video={video} key={video._id} />
          ))}
      </div>
      {!likedVideos.loading && likedVideos.data.length == 0 && (
        <div className="w-full h-4-6 grid place-content-center place-items-center gap-1">
          <h2>Liked video is empty</h2>
          <Link to="/" className="btn btn-primary w-fit">
            View videos
          </Link>
        </div>
      )}
    </>
  );
};

export default LikedVideoGrid;
