import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import { restoreSession } from "./store/reducers/auth";

import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./context/Modal";

const store = configureStore();

const initializeApp = () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <ModalProvider>
            <App />
          </ModalProvider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null
) {
  store.dispatch(restoreSession()).then(initializeApp);
} else {
  initializeApp();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
