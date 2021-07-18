import { I18nActionTypes } from "./i18n.types";

const INITIAL_STATE = {
  lang: 'th',

};

const i18nReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case I18nActionTypes.SET_I18N:
      return {
        ...state,
        lang: action.payload,
      };
    default:
      return state;
  }
};

export default i18nReducer;
