import { SAVE_POST_DATA, SAVE_LATEST_POST_DATA, SAVE_ALL_POSTS_DATA} from './../actions/allActions';

const postDefaultState = {
  allPosts: null,
  post: undefined,
  latestPost: undefined
};

export function postReducer(state = postDefaultState, action) {

  let newState = { ...state };

  switch (action.type) {
    case SAVE_POST_DATA:
      newState.post = action.postData;
      break;
    case SAVE_LATEST_POST_DATA: 
      newState.latestPost = action.latestPostData;
    case SAVE_ALL_POSTS_DATA: 
      newState.allPosts = action.allPostsData
    default:
      break;
  }

  return newState;
};

export default postReducer;