import { ToastContainer } from "@daycan/ui";
import Router from "./router/Route";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "./contexts/QueryProvider";

function App() {
  return (
    <QueryClientProvider>
      <BrowserRouter>
        <Router />
        <ToastContainer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
