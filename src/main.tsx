import React from "react";
import ReactDOM from "react-dom/client";
import "globals.css";
import App from "App";
import SickListProvider from "@contexts/sickList";
import { HttpClient } from "@instances/HttpClient";
import { SickListInstance } from "@instances/SickListInstance";
import SearchProvider from "@contexts/search";

const httpClient = new HttpClient();
const sickListInstance = new SickListInstance(httpClient);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SearchProvider>
      <SickListProvider sickListInstance={sickListInstance}>
        <App />
      </SickListProvider>
    </SearchProvider>
  </React.StrictMode>
);
