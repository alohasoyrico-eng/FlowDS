/// <reference types="vite/client" />
import { RouterProvider } from "react-router";

import { router } from "./routes";
import { FlowThemeProvider } from "./primitives";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <FlowThemeProvider>
        <RouterProvider router={router} />
      </FlowThemeProvider>
    </ErrorBoundary>
  );
}
