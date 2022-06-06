import React from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import NotAvailable from "../../components/NotAvailable";
import { useWatchLater } from "../../context";
import WatchLaterVideoCard from "./WatchLaterVideoCard";

const WatchLaterGrid = () => {
  const { watchLater } = useWatchLater();

  return (
    <>
      {watchLater.loading && <Loader />}
      <div className="grid mt-3 gap-1 video-grid  w-full">
        {!watchLater.loading &&
          watchLater.data.length > 0 &&
          watchLater.data.map((video, i) => (
            <WatchLaterVideoCard video={video} key={video._id} />
          ))}
      </div>
      {!watchLater.loading && watchLater.data.length == 0 && (
        <div className="w-full h-4-6 grid place-content-center place-items-center gap-1">
          <NotAvailable title="Watch Later video is empty" />

          <Link to="/" className="btn btn-primary w-fit">
            View videos
          </Link>
        </div>
      )}
    </>
  );
};

export default WatchLaterGrid;
