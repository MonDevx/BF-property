import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { store, persistor } from "./redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.render(
  <Provider store={store}>
    <HashRouter hashType ="noslash">
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
