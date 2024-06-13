import React from "react";
import AppRoutes from "./routes";
import ErrorBoundary from "./components/Error/ErrorBoundary";
import GlobalError from "./components/Error/GlobalError";
import { ErrorProvider } from "./context/ErrorContext";

const App: React.FC = () => {
  return (
    <ErrorProvider>
      <ErrorBoundary>
        <div className="App">
          <AppRoutes />
          <GlobalError />
        </div>
      </ErrorBoundary>
    </ErrorProvider>
  );
};

export default App;
