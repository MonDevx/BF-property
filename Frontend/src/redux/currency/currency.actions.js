import { CurrencyActionTypes } from './currency.types';
export const setCurrency = currency => ({
  type: CurrencyActionTypes.SET_CURRENCY,
  payload: currency
});
