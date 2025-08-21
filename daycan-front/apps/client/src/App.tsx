import { ToastContainer } from "@daycan/ui";
import Router from "./router/Route";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "./contexts/QueryProvider";
import { Loading, ScrollToTop } from "./components";
import { Suspense } from "react";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider>
        <ScrollToTop />
        <Suspense fallback={<Loading />}>
          <Router />
        </Suspense>
        <ToastContainer />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
