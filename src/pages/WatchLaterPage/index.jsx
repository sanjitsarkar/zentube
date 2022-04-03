import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";
import WatchLaterGrid from "./WatchLaterGrid";

const WatchLaterPage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Layout>
      {!isLoggedIn ? (
        <div className="w-full h-4-6 grid place-content-center">
          <h2>
            <Link to="/login" className="text-primary">
              Log In
            </Link>{" "}
            to see your watch later videos.
          </h2>
        </div>
      ) : (
        <WatchLaterGrid />
      )}
    </Layout>
  );
};

export default WatchLaterPage;
