import MockmanEs from "mockman-js";
import React from "react";
import { Routes, Route } from "react-router-dom";
import AddToPlaylistModal from "./components/AddToPlaylistModal";
import PrivateRoute from "./components/PrivateRoute";
import Toast from "./components/Toast";
import { useToast } from "./context/ToastContext";
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
  const { toast } = useToast();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/watch-later" element={<WatchLaterPage />} />
        <Route path="/liked" element={<LikedPage />} />
        <Route path="/playlist" element={<PlaylistsPage />} />

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
      <Toast content={toast.content} type={toast.type} show={toast.show} />
      <AddToPlaylistModal />
    </>
  );
}

export default App;
