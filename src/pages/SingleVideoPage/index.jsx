import React, { useEffect } from "react";
import Loader from "../../components/Loader";
import VideoCard from "../../components/VideoCard.jsx";
import { useVideos } from "../../context/VideosContext";
<<<<<<< HEAD
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
=======
>>>>>>> db8e5dcdd74776570063d97caee3d94d4811bbdf

const RelatedVideos = ({ category, videoId }) => {
  const { filterVideos, relatedVideos } = useVideos();
  useEffect(async () => {
    await filterVideos({ category, type: "related" });
  }, []);
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
    </div>
  );
};

export default RelatedVideos;
