import React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { store, persistor } from "./redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import './assets/fonts/LINESeedSansTH_W_Rg.woff'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <React.StrictMode>  <Provider store={store}>
  <BrowserRouter >
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </BrowserRouter>
</Provider></React.StrictMode>);
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
