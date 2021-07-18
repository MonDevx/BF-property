import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "../root-reducer";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";

const logger = createLogger();
let middleware = [];
if (process.env.NODE_ENV === "development") {
  middleware = [thunk, logger];
} else {
  middleware = [thunk];
}

export const reduxStore = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);
export const reduxPersistor = persistStore(reduxStore, {});
