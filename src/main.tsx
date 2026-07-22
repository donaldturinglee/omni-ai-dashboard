import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "@/router";
import "@/styles/main.css";

export const Main = () => <RouterProvider router={router} />;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Main />
  </StrictMode>,
);
