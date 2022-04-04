import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useNav } from "../../context/NavContext";

const PlaylistsPage = () => {
  const { setActiveItem } = useNav();
  useEffect(() => {
    setActiveItem("Playlist");
  }, []);
  return (
    <Layout>
      <h1>Playlists Page</h1>
    </Layout>
  );
};

export default PlaylistsPage;
