import React from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import NotAvailable from "../../components/NotAvailable";
import { useLikedVideos } from "../../context";
import LikedVideoCard from "./LikedVideoCard";

const LikedVideoGrid = () => {
  const { likedVideos } = useLikedVideos();
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
          <NotAvailable title="Liked video is empty" />

          <Link to="/" className="btn btn-primary w-fit">
            View videos
          </Link>
        </div>
      )}
    </>
  );
};

export default LikedVideoGrid;
