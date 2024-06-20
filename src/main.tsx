import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";

import "./index.css";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { theme } from "./theme";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <React.StrictMode>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  </>
);
