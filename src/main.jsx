import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import { enableReactComponents } from "@legendapp/state/config/enableReactComponents";
import { UserContextWrapper } from "./Contexts/UserContext.jsx";
// This makes React components automatically track get() calls to re-render
enableReactTracking({ auto: true });
enableReactComponents();

createRoot(document.getElementById("root")).render(
  <UserContextWrapper>
    <App />
  </UserContextWrapper>
);
