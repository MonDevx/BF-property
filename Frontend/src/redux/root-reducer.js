import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/user.reducer";
import i18nReducer from "./i18n/i18n.reducer";
import currencyReducer from "./currency/currency.reducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["language", "currency"],
};
const rootReducer = combineReducers({
  user: userReducer,
  language: i18nReducer,
  currency: currencyReducer,
});
export default persistReducer(persistConfig, rootReducer);
