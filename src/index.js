import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { VideosProvider } from "./context/VideosContext";
import { NavProvider } from "./context/NavContext";
import { WatchLaterProvider } from "./context/WatchLaterContext";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { PlaylistProvider } from "./context/PlaylistsContext";
import { PlaylistModalProvider } from "./context/PlaylistModalContext";
import { LikedVideosProvider } from "./context/LikedVideosContext";
import { CategoryProvider } from "./context/CategoryContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <NavProvider>
          <CategoryProvider>
            <AuthProvider>
              <PlaylistModalProvider>
                <VideosProvider>
                  <WatchLaterProvider>
                    <PlaylistProvider>
                      <LikedVideosProvider>
                        <App />
                      </LikedVideosProvider>
                    </PlaylistProvider>
                  </WatchLaterProvider>
                </VideosProvider>
              </PlaylistModalProvider>
            </AuthProvider>
          </CategoryProvider>
        </NavProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
