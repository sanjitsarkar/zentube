import React from "react";
import Layout from "../../components/Layout";
import TagList from "./TagList";
import VideoGrid from "./VideoGrid";

const HomePage = () => {
  return (
    <Layout>
      <TagList />
      <VideoGrid />
    </Layout>
  );
};

export default HomePage;
