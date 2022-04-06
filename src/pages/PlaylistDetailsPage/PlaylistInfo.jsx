import React from "react";
import { PlaySpeedIcon } from "../../assets/icons";

const PlaylistInfo = ({ playlistId, playlistsInfo }) => {
  return (
    <div className="p-2 bg-black-6 mb-3">
      <h4 className="text-xl mb-1 text-primary row items-center gap-05">
        <PlaySpeedIcon className={"text-primary"} />
        <span>Playlist Info</span>
      </h4>
      <h3 className="text-lg row items-center ml-1">
        {playlistsInfo.get(playlistId).title}
      </h3>
      <p className="o-60 ml-1 text-md">
        {playlistsInfo.get(playlistId).description}
      </p>
    </div>
  );
};

export default PlaylistInfo;
