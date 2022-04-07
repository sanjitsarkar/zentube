import React from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import NotAvailable from "../../components/NotAvailable";
import { useHistory } from "../../context/HistoryContext";
import HistoryVideoCard from "./HistoryVideoCard";

const HistoryVideoGrid = () => {
  const { history, clearAllHistory } = useHistory();

  return (
    <>
      {history.data.length > 0 && (
        <div className="row justify-end">
          <button className="btn btn-secondary " onClick={clearAllHistory}>
            <i className="fa fa-lg fa-x pt-1 pb-1 pl-1"></i>
            <span className="ml-2 mr-2 text-md">Clear All History</span>
          </button>
        </div>
      )}
      {history.loading && <Loader />}
      <div className="grid mt-3 gap-1 video-grid  w-full">
        {!history.loading &&
          history.data.length > 0 &&
          history.data.map((video) => (
            <HistoryVideoCard video={video} key={video._id} />
          ))}
      </div>
      {!history.loading && history.data.length == 0 && (
        <div className="w-full h-4-6 grid place-content-center place-items-center gap-1">
          <NotAvailable title="History is empty" />

          <Link to="/" className="btn btn-primary w-fit">
            View videos
          </Link>
        </div>
      )}
    </>
  );
};

export default HistoryVideoGrid;
