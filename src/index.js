import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {
  AuthProvider,
  HistoryProvider,
  NavProvider,
  PlaylistProvider,
  VideosProvider,
  WatchLaterProvider,
} from "./context";
import { CategoryProvider } from "./context/CategoryContext";
import { LikedVideosProvider } from "./context/LikedVideosContext";
import { PlaylistModalProvider } from "./context/PlaylistModalContext";
import { ToastProvider } from "./context/ToastContext";
import "./index.css";
import { makeServer } from "./server";

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
                      <PlaylistProvider>
                        <PlaylistModalProvider>
                          <App />
                        </PlaylistModalProvider>
                      </PlaylistProvider>
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
