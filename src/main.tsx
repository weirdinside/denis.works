import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { ThemeProvider } from "./contexts/ThemeProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { PathProvider } from "./contexts/LocationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PathProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PathProvider>
    </BrowserRouter>
  </StrictMode>,
);
