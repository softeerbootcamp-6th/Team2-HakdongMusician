import { createRoot } from "react-dom/client";
import "./styles/reset.css";
import "@daycan/ui/style.css";
import "@daycan/api";
import App from "./App.tsx";
import { THEME } from "@daycan/ui";
import { initSentry } from "./services/error/sentry";

initSentry();
createRoot(document.getElementById("root")!).render(
  <div className={THEME}>
    <App />
    <div id="modal-root"></div>
  </div>
);
