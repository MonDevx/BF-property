import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "../root-reducer";
import { persistStore } from "redux-persist";
const logger = createLogger();
let middleware = [];
if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, logger];
} else {
  middleware = [...middleware];
}

export const store = createStore(rootReducer, applyMiddleware(...middleware));
export const persistor = persistStore(store);
export default store;
