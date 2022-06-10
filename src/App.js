import MockmanEs from "mockman-js";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AddToPlaylistModal from "./components/AddToPlaylistModal";
import PrivateRoute from "./components/PrivateRoute";
import Toast from "./components/Toast";
import { useToast } from "./context/ToastContext";
import {
  HistoryPage,
  HomePage,
  LikedPage,
  LoginPage,
  PageNotFound,
  PlaylistDetailsPage,
  PlaylistsPage,
  SignupPage,
  SingleVideoPage,
  WatchLaterPage,
} from "./pages";

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

        <Route element={<PrivateRoute />}>
          <Route path="/playlists/:id" element={<PlaylistDetailsPage />} />
        </Route>

        <Route path="/watch/v/:id" element={<SingleVideoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/mockman" element={<MockmanEs />} />
      </Routes>
      <Toast content={toast.content} type={toast.type} show={toast.show} />
      <AddToPlaylistModal />
    </>
  );
}

export default App;
