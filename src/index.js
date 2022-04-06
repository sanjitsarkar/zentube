import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { TagProvider } from "./context/TagContext";
import { VideosProvider } from "./context/VideosContext";
import { NavProvider } from "./context/NavContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <NavProvider>
            <TagProvider>
              <VideosProvider>
                <App />
              </VideosProvider>
            </TagProvider>
          </NavProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
