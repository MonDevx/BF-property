import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "../root-reducer";
const logger = createLogger();
let middleware = [];
if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, logger];
} else {
  middleware = [...middleware];
}

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
