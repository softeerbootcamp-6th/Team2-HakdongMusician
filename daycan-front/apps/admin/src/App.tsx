import { BrowserRouter } from "react-router-dom";
import Router from "./router/Route";
import { QueryClientProvider } from "./contexts/QueryProvider";
import { ToastContainer } from "@daycan/ui";

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
