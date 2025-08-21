import { BrowserRouter } from "react-router-dom";
import Router from "./router/Route";
import { QueryClientProvider } from "./contexts/QueryProvider";
import { ToastContainer } from "@daycan/ui";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider>
        <Router />
        <ToastContainer />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
