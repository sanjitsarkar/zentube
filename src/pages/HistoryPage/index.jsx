import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useAuth, useNav } from "../../context";
import HistoryVideoGrid from "./HistoryVideoGrid";

const HistoryPage = () => {
  const { setActiveItem } = useNav();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    setActiveItem("History");
  }, []);
  return (
    <Layout>
      {!isLoggedIn ? (
        <div className="text-center w-full h-4-6 grid place-content-center">
          <h2>
            <Link to="/login" className="text-primary">
              Log In
            </Link>{" "}
            to see your history.
          </h2>
        </div>
      ) : (
        <HistoryVideoGrid />
      )}
    </Layout>
  );
};

export default HistoryPage;
