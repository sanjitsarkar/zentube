import React from "react";
import Layout from "../../components/Layout";
import { useNav } from "../../context/NavContext";

const HistoryPage = () => {
  const { setActiveItem } = useNav();
  useEffect(() => {
    setActiveItem("History");
  });
  return (
    <Layout>
      <h1>History Page</h1>
    </Layout>
  );
};

export default HistoryPage;
