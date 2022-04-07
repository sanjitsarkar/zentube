import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import { useVideos } from "../../context/VideosContext";
import RelatedVideos from "./RelatedVideos";
import VideoInfo from "./VideoInfo";
import "./SingleVideoPage.css";
import { useNav } from "../../context/NavContext";
import NotAvailable from "../../components/NotAvailable";
const SingleVideoPage = () => {
  const location = useLocation();
<<<<<<< HEAD
  const { fetchVideoInfo, video } = useVideos();
=======
  const { setActiveItem } = useNav();
  useEffect(() => {
    setActiveItem("");
  }, []);
  const { fetchVideoInfo, videoInfo } = useVideos();
>>>>>>> pages/playlist-details-page
  useEffect(() => {
    let pathName = location.pathname.split("/");
    let videoId = pathName[pathName.length - 1];
    fetchVideoInfo(videoId);
  }, [location]);

  return (
    <Layout>
      <div className="row flex-wrap ">
<<<<<<< HEAD
        {video.loading && <Loader />}

        {!video.loading && video.data.length !== 0 && (
=======
        {videoInfo.loading && (
          <div className="w-screen h-72 grid place-content-center place-items-center gap-1">
            <Loader />
          </div>
        )}
        {!videoInfo.loading && videoInfo.data.length !== 0 && (
>>>>>>> pages/playlist-details-page
          <>
            <VideoInfo video={video.data} />
            <RelatedVideos
              videoId={video.data._id}
              category={video.data.category}
            />
          </>
        )}

<<<<<<< HEAD
        {!video.loading && video.data.length === 0 && (
          <div className="w-full h-4-6 grid place-content-center place-items-center gap-1">
            <h2>Video is not found</h2>
=======
        {!videoInfo.loading && videoInfo.data.length === 0 && (
          <div className="w-screen h-4-6 grid place-content-center place-items-center gap-1">
            <NotAvailable title="Video is not available" />
>>>>>>> pages/playlist-details-page
            <Link to="/" className="btn btn-primary w-fit">
              Go to Home
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SingleVideoPage;
