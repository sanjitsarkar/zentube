import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useNav } from "../../context/NavContext";
import TagList from "./TagList";
import VideoGrid from "./VideoGrid";

const HomePage = () => {
  const { setActiveItem } = useNav();
  useEffect(async () => {
    setActiveItem("Home");
  }, []);
  return (
    <Layout>
      <TagList />
      <VideoGrid />
    </Layout>
  );
};

export default HomePage;
