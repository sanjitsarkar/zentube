import React, { useState, createContext, useContext } from "react";

const TagContext = createContext();

const TagProvider = ({ children }) => {
  const [activeTag, setActiveTag] = useState("All");

  const tags = ["All", "EDM", , "Music", "Classical", "Hip Hop", "Pop"];
  return (
    <TagContext.Provider
      value={{
        tags,
        activeTag,
        setActiveTag,
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

const useTag = () => useContext(TagContext);
export { useTag, TagProvider };
