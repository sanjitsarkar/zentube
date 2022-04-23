import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";
import { useNav } from "../../context/NavContext";
import WatchLaterGrid from "./WatchLaterGrid";

const WatchLaterPage = () => {
  const { isLoggedIn } = useAuth();
  const { setActiveItem } = useNav();
  useEffect(() => {
    setActiveItem("Watch Later");
  }, []);
  return (
    <Layout>
      {!isLoggedIn ? (
        <div className="text-center w-full h-4-6 grid place-content-center">
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
