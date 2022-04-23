import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";
import { useNav } from "../../context/NavContext";
import LikedVideoGrid from "./LikedVideoGrid";

const LikedPage = () => {
  const { setActiveItem } = useNav();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    setActiveItem("Liked Videos");
  }, []);
  return (
    <Layout>
      {!isLoggedIn ? (
        <div className="text-center w-full h-4-6 grid place-content-center">
          <h2>
            <Link to="/login" className="text-primary">
              Log In
            </Link>{" "}
            to see your liked videos.
          </h2>
        </div>
      ) : (
        <LikedVideoGrid />
      )}
    </Layout>
  );
};

export default LikedPage;
