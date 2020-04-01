const initialState = {
  currentUser: undefined
}

function setCurrentUser(user) {
  return { type: "SET_CURRENT_USER", user };
}

export function userReducer(state = initialState, action) {
  let newState = { ...state };

  switch (action.type) {
    case "SET_CURRENT_USER":
      newState.currentUser = action.user;
      break;
    default:
      break;
  }

  return newState;
}

export default userReducer;