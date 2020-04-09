import { SAVE_CURRENT_USER } from "./../actions/allActions";

const currentUserDefaultState = {
  currentUser: undefined
}

export function userReducer(state = currentUserDefaultState, action) {
  let newState = { ...state };

  switch (action.type) {
    case SAVE_CURRENT_USER:
      newState.currentUser = action.userData;
      break;
    default:
      break;
  }

  return newState;
}

export default userReducer;