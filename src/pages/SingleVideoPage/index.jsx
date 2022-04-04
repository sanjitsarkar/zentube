import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import { useVideos } from "../../context/VideosContext";
import RelatedVideos from "./RelatedVideos";
import VideoInfo from "./VideoInfo";
import "./SingleVideoPage.css";
const SingleVideoPage = () => {
  const location = useLocation();
  const { fetchVideoInfo, videoInfo } = useVideos();
  useEffect(async () => {
    let pathName = location.pathname.split("/");
    let videoId = pathName[pathName.length - 1];
    await fetchVideoInfo(videoId);
  }, [location]);

  return (
    <Layout>
      <div className="row flex-wrap ">
        {videoInfo.loading && <Loader />}
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
          <div className="w-full h-4-6 grid place-content-center place-items-center gap-1">
            <h2>Video is not found</h2>
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
