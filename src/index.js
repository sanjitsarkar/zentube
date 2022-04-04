import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { TagProvider } from "./context/TagContext";
import { VideosProvider } from "./context/VideosContext";
import { NavProvider } from "./context/NavContext";
import { WatchLaterProvider } from "./context/WatchLaterContext";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <NavProvider>
          <AuthProvider>
            <TagProvider>
              <VideosProvider>
                <WatchLaterProvider>
                  <LikedVideosProvider>
                    <App />
                  </LikedVideosProvider>
                </WatchLaterProvider>
              </VideosProvider>
            </TagProvider>
          </AuthProvider>
        </NavProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
