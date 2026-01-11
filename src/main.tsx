import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/app/store";
import { queryClient } from "@/app/queryClient";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { App } from "./App";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Redux global state provider */}
    <Provider store={store}>
      {/* React Query client provider */}
      <QueryClientProvider client={queryClient}>
        {/* Custom theme context provider */}
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
