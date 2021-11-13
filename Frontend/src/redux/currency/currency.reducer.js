import { CurrencyActionTypes } from "./currency.types";

const INITIAL_STATE = {
  currency: 'th',

};

const currencyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CurrencyActionTypes.SET_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };
    default:
      return state;
  }
};

export default currencyReducer;
