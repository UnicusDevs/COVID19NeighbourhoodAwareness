import { TOGGLE_POPUP_OFF_SIGNUP, TOGGLE_POPUP_ON_SIGNUP, TOGGLE_POPUP_OFF_LOGIN, TOGGLE_POPUP_ON_LOGIN } from './allActions';

export const togglePopUpOffSignUp = () => ({
  type: TOGGLE_POPUP_OFF_SIGNUP
});

export const togglePopUpOnSignUp = () => ({
  type: TOGGLE_POPUP_ON_SIGNUP
});

export const togglePopUpOffLogin = () => ({
  type: TOGGLE_POPUP_OFF_LOGIN
});

export const togglePopUpOnLogin = () => ({
  type: TOGGLE_POPUP_ON_LOGIN
});