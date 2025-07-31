import { ToastContainer } from "@daycan/ui";
import { TypoTest } from "./pages/TypoTest";
import Router from "./router/Route";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Router />
      <ToastContainer />
    </BrowserRouter>
  );

}

export default App;
