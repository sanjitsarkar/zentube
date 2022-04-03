import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { TagProvider } from "./context/TagContext";
import { VideosProvider } from "./context/VideosContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <TagProvider>
        <VideosProvider>
          <App />
        </VideosProvider>
      </TagProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
