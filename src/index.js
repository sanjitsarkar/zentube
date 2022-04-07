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
import { LikedVideosProvider } from "./context/LikedVideosContext";
import { CategoryProvider } from "./context/CategoryContext";
import { HistoryProvider } from "./context/HistoryContext";
import { PlaylistProvider } from "./context/PlaylistsContext";
import { PlaylistModalProvider } from "./context/PlaylistModalContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <NavProvider>
          <AuthProvider>
            <HistoryProvider>
              <CategoryProvider>
                <VideosProvider>
                  <WatchLaterProvider>
                    <LikedVideosProvider>
<<<<<<< HEAD
                      <App />
=======
                      <PlaylistProvider>
                        <PlaylistModalProvider>
                          <App />
                        </PlaylistModalProvider>
                      </PlaylistProvider>
>>>>>>> pages/playlist-details-page
                    </LikedVideosProvider>
                  </WatchLaterProvider>
                </VideosProvider>
              </CategoryProvider>
            </HistoryProvider>
          </AuthProvider>
        </NavProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
