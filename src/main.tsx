import React from "react";
import { createRoot } from "react-dom/client";
import Page from "../page";
import "./styles.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
);
