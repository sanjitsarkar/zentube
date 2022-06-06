import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useCategory, useNav, useVideos } from "../../context";
import CategoryList from "./CategoryList";
import VideoGrid from "./VideoGrid";

const HomePage = () => {
  const { setActiveItem } = useNav();
  const { filterVideos } = useVideos();
  const { setActiveCategory } = useCategory();
  useEffect(() => {
    setActiveCategory("All");
    filterVideos({ category: "All", type: "video" });
    setActiveItem("Home");
  }, []);

  return (
    <Layout>
      <CategoryList />
      <VideoGrid />
    </Layout>
  );
};

export default HomePage;
