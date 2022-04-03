import React from "react";
import { AddToPlaylistIcon, WatchLaterIcon } from "../../assets/icons";
import ActionButton from "./ActionButton";

const ActionBar = ({ id, show }) => {
  return (
    <div className="action-bar absolute r-3 t-05 bg-primary p-1 br-sm bx-sh-primary-3 ">
      <ActionButton
        id={id}
        show={show}
        title="Add to watch later"
        Icon={WatchLaterIcon}
        onClick={() => {}}
      />
      <ActionButton
        id={id}
        show={show}
        Icon={AddToPlaylistIcon}
        title="Save to playlist"
        onClick={() => {}}
      />
    </div>
  );
};

export default ActionBar;
