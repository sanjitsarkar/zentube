import React from "react";

const PlaylistInfo = ({ playlistVideos, playlistsInfo }) => {
  return (
    <div>
      <h3 className="text-primary playlist-title">
        {/* {playlistsInfo.get(playlistVideos._id).title} */}
      </h3>
      {/* <p>{playlistsInfo.get(playlistVideos._id).description}</p> */}
    </div>
  );
};

export default PlaylistInfo;
