import { I18nActionTypes } from './i18n.types';
export const setI18n = lang => ({
  type: I18nActionTypes.SET_I18N,
  payload: lang
});
