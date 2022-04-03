import React from "react";

const ActionButton = ({ id, title, Icon, show, onClick }) => {
  return (
    <button
      className="row items-center text-sm gap-05 p-0 font-bold"
      onClick={() => {
        show(false);
        onClick();
      }}
    >
      {<Icon width={"1.8rem"} />}
      <span>{title}</span>
    </button>
  );
};

export default ActionButton;
