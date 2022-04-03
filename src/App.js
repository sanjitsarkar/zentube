import MockmanEs from "mockman-js";
import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import {
  HistoryPage,
  HomePage,
  LoginPage,
  SignupPage,
  LikedPage,
  PlaylistDetailsPage,
  PlaylistsPage,
  SingleVideoPage,
  WatchLaterPage,
} from "./pages";
import NotFound from "./pages/404";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <HistoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/watch-later"
          element={
            <PrivateRoute>
              <WatchLaterPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/liked"
          element={
            <PrivateRoute>
              <LikedPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/playlist"
          element={
            <PrivateRoute>
              <PlaylistsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/playlists/:id"
          element={
            <PrivateRoute>
              <PlaylistDetailsPage />
            </PrivateRoute>
          }
        />

        <Route path="/watch/v/:id" element={<SingleVideoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/mockman" element={<MockmanEs />} />
      </Routes>
    </>
  );
}

export default App;
