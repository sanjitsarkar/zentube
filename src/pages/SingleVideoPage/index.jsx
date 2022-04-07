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
  const { setActiveItem } = useNav();
  useEffect(() => {
    setActiveItem("");
  }, []);
  const { fetchVideoInfo, videoInfo } = useVideos();
  useEffect(() => {
    let pathName = location.pathname.split("/");
    let videoId = pathName[pathName.length - 1];
    fetchVideoInfo(videoId);
  }, [location]);

  return (
    <Layout>
      <div className="row flex-wrap ">
        {videoInfo.loading && (
          <div className="w-screen h-72 grid place-content-center place-items-center gap-1">
            <Loader />
          </div>
        )}
        {!videoInfo.loading && videoInfo.data.length !== 0 && (
          <>
            <VideoInfo video={videoInfo.data} />
            <RelatedVideos
              videoId={videoInfo.data._id}
              category={videoInfo.data.category}
            />
          </>
        )}

        {!videoInfo.loading && videoInfo.data.length === 0 && (
          <div className="w-screen h-4-6 grid place-content-center place-items-center gap-1">
            <NotAvailable title="Video is not available" />
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
