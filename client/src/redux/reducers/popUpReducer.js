import { TOGGLE_POPUP_OFF_SIGNUP, TOGGLE_POPUP_ON_SIGNUP, TOGGLE_POPUP_OFF_LOGIN, TOGGLE_POPUP_ON_LOGIN } from './../actions/allActions';

const popUpDefaultState = {
  displayPopUpSignUp: false,
  displayPopUpLogin: false
};

const popUpReducer = (state = popUpDefaultState, action) => {
  switch (action.type) {
    case TOGGLE_POPUP_OFF_SIGNUP:
      return {
        ...state,
        displayPopUpSignUp: state.displayPopUpSignUp = false
      }
    case TOGGLE_POPUP_ON_SIGNUP:
      return {
        ...state,
        displayPopUpSignUp: state.displayPopUpSignUp = true
      }
    case TOGGLE_POPUP_OFF_LOGIN: 
      return {
        ...state,
        displayPopUpLogin: state.displayPopUpLogin = false
      }
    case TOGGLE_POPUP_ON_LOGIN:
      return {
        ...state,
        displayPopUpLogin: state.displayPopUpLogin = true
      }
    default:
      return state
  }
};

export default popUpReducer;