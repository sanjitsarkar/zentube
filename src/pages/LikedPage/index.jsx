import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useNav } from "../../context/NavContext";

const LikedPage = () => {
  const { setActiveItem } = useNav();
  useEffect(() => {
    setActiveItem("Liked Videos");
  });
  return (
    <Layout>
      <h1>Liked Page</h1>
    </Layout>
  );
};

export default LikedPage;
