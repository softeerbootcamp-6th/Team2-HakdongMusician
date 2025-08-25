import { ToastContainer } from "@daycan/ui";
import Router from "./router/Route";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "./contexts/QueryProvider";
import { Loading, ScrollToTop } from "./components";
import { Suspense } from "react";
import * as Sentry from "@sentry/react";
import { ErrorFallback } from "./components/ErrorFallback";

function App() {
  return (
    <Sentry.ErrorBoundary
      fallback={({
        error,
        resetError,
      }: {
        error: unknown;
        resetError: () => void;
      }) => <ErrorFallback error={error as Error} resetError={resetError} />}
      beforeCapture={(scope) => {
        scope.setTag("boundary", "root");
      }}
    >
      <BrowserRouter>
        <QueryClientProvider>
          <ScrollToTop />
          <Suspense fallback={<Loading />}>
            <Router />
          </Suspense>
          <ToastContainer />
        </QueryClientProvider>
      </BrowserRouter>
    </Sentry.ErrorBoundary>
  );
}

export default App;
