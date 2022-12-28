import React from "react";
import ReactDOM from "react-dom/client";
import "pure-react-carousel/dist/react-carousel.es.css";
import "react-h5-audio-player/lib/styles.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import { restoreSession } from "./features/auth/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ModalProvider } from "./context/Modal";
import { LandingPage } from "./features/landing/components/LandingPage";
import { DiscoverPage } from "./features/discover/pages/DiscoverPage";
import { LogoutPage } from "./features/auth/components/LogoutPage";
import { TrackShowPage } from "./features/tracks/pages/TrackShowPage";
import { UploadNewTrackPage } from "./features/tracks/components/UploadNewTrackPage";
import { UserProfilePage } from "./features/profiles/pages/UserProfilePage";

const store = configureStore();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/discover", element: <DiscoverPage /> },
      { path: "/:user/:trackSlug", element: <TrackShowPage /> },
      { path: "/upload", element: <UploadNewTrackPage /> },
      { path: "/:slug", element: <UserProfilePage /> },
      { path: "/logout", element: <LogoutPage /> },
    ],
  },
]);

const initializeApp = () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </Provider>
    </React.StrictMode>
  );
};

store.dispatch(restoreSession()).then(initializeApp);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
