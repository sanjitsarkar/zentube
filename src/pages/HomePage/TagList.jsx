import React from "react";
import { useTag } from "../../context/TagContext";
import Tag from "./Tag";

const TagList = () => {
  const { tags, activeTag, setActiveTag } = useTag();

  return (
    <div className="row gap-1">
      {tags.map((tag) => (
        <Tag
          name={tag}
          active={activeTag === tag}
          activeTag={activeTag}
          setActive={setActiveTag}
          key={tag}
        />
      ))}
    </div>
  );
};

export default TagList;
