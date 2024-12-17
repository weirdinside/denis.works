import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { NuqsAdapter } from "nuqs/adapters/react";
import { ThemeProvider } from "./contexts/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NuqsAdapter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </NuqsAdapter>
  </StrictMode>,
);
