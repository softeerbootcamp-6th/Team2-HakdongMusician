import { createRoot } from "react-dom/client";
import "@daycan/ui/style.css";
import "./styles/reset.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
