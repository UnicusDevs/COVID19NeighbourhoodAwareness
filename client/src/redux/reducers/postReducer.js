import {SAVE_POST_DATA} from './../actions/allActions';

const postDefaultState = {
  post: undefined
};

export function postReducer(state = postDefaultState, action) {

  let newState = { ...state };

  switch (action.type) {
    case SAVE_POST_DATA:
      newState.post = action.postData;
      break;
    default:
      break;
  }

  return newState;
};

export default postReducer;