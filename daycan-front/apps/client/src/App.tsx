import { ToastContainer } from "@daycan/ui";
import Router from "./router/Route";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "./contexts/QueryProvider";
import { ScrollToTop } from "./components";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider>
        <ScrollToTop />
        <Router />
        <ToastContainer />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
