import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@mui/material/styles";
import {theme} from "./personalizadTheme"


//todeploy 
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <React.StrictMode>
        <CssBaseline />
          <App />
      </React.StrictMode>
    </Provider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
