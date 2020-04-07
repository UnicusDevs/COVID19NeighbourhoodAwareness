import { TOGGLE_POPUP_OFF, TOGGLE_POPUP_ON } from './../actions/allActions';

const popUpDefaultState = {
  displayPopUp: false
};

const popUpReducer = (state = popUpDefaultState, action) => {
  switch (action.type) {
    case TOGGLE_POPUP_OFF:
      return {
        displayPopUp: state.displayPopUp = false
      }
    case TOGGLE_POPUP_ON:
      return {
        displayPopUp: state.displayPopUp = true
      }

    default:
      return state
  }
};

export default popUpReducer;