import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useNav } from "../../context/NavContext";
import CategoryList from "./CategoryList";
import VideoGrid from "./VideoGrid";

const HomePage = () => {
  const { setActiveItem } = useNav();
  useEffect(() => {
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
