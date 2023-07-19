import React from "react";
import ReactDOM from "react-dom/client";
import "globals.css";
import App from "App";
import SickListProvider from "@contexts/sickList";
import { HttpClient } from "@instances/HttpClient";
import { SickListService } from "@instances/SickListService";
import SearchProvider from "@contexts/search";
import { LocalStorage } from "@instances/LocalStorage";
import { CacheService } from "@instances/CacheService";
import CacheProvider from "@contexts/cache";

const httpClient = new HttpClient();
const sickListService = new SickListService(httpClient);
const localStorage = new LocalStorage();
const cacheService = new CacheService(localStorage);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CacheProvider cacheService={cacheService}>
      <SearchProvider>
        <SickListProvider sickListService={sickListService}>
          <App />
        </SickListProvider>
      </SearchProvider>
    </CacheProvider>
  </React.StrictMode>
);
