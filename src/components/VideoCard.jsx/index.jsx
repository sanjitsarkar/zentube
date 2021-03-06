import React, { useState } from "react";
import { Link } from "react-router-dom";
import { convertViewCount, timeSince } from "../../utils";
import ActionBar from "./ActionBar";

const VideoCard = ({ video, small = false }) => {
  const [showActionBar, setShowActionBar] = useState(false);
  return (
    <div
      className="card card-md card-dark"
      id={`${!small ? "medium-card" : "small-card"}`}
    >
      <Link to={`/watch/v/${video._id}`}>
        <div className="card-header relative grid place-items-center">
          <i className="fa fa-play absolute fa-2x text-primary o-80 play-icon"></i>
          <img
            src={video.thumbNail}
            alt={video.title}
            className="w-full card-img"
          />
        </div>
      </Link>
      <div className="card-bottom">
        <div className="card-body">
          <div className="flex items-start justify-between relative">
            <h3 className="card-title">{video.title}</h3>
            {showActionBar && (
              <ActionBar video={video} show={setShowActionBar} />
            )}
            <button
              className="more-option-btn w-0 btn-dark"
              onClick={() => setShowActionBar(!showActionBar)}
            >
              <i className="fa-solid fa-ellipsis-vertical fa-lg"></i>
            </button>
          </div>
          <div className="row items-center w-full mt-05 justify-between">
            <div className="row item-center  gap-1">
              <h5 className="o-70 font-semibold">
                {convertViewCount(video.viewCount)} views
              </h5>
              <h5 className="o-70 font-semibold">
                {timeSince(video.publishedAt)} ago
              </h5>
            </div>
          </div>
          <div className="row items-center gap-05 mt-1 flex-nowrap">
            <img
              src={video.creatorImage}
              alt={video.creatorName}
              className="w-10 h-10"
              id="img-rounded"
            />
            <h4 className="o-70 font-normal channel-name">
              {video.creatorName}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
