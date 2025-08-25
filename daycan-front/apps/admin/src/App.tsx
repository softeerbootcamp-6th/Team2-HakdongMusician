import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "./contexts/QueryProvider";
import { ToastContainer } from "@daycan/ui";
import * as Sentry from "@sentry/react";
import { ErrorFallback } from "@/components";
import Router from "./router/Route";

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
    >
      <BrowserRouter>
        <QueryClientProvider>
          <Router />
          <ToastContainer />
        </QueryClientProvider>
      </BrowserRouter>
    </Sentry.ErrorBoundary>
  );
}

export default App;
