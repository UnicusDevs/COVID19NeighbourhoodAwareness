import { SAVE_POST_DATA, SAVE_LATEST_POST_DATA, SAVE_ALL_POSTS_DATA, ADD_POST_TO_ALL_POSTS, SAVE_FILTERED_POSTS_DATA} from './../actions/allActions';

const postDefaultState = {
  allPosts: [],
  filteredPosts: [],
  post: undefined,
  latestPost: []
};

export function postReducer(state = postDefaultState, action) {

  let newState = { ...state };

  switch (action.type) {
    case SAVE_POST_DATA:
      newState.post = action.postData;
      break;
    case SAVE_LATEST_POST_DATA: 
      newState.latestPost = action.latestPostData;
      break;
    case SAVE_ALL_POSTS_DATA: 
      newState.allPosts = action.allPostsData;
      break;
    case SAVE_FILTERED_POSTS_DATA:
      newState.filteredPosts = action.filteredPosts;
      break;
    case ADD_POST_TO_ALL_POSTS:
      newState.allPosts = state.allPosts.concat(action.newPost)
      break;
    default:
      break;
  }

  return newState;
};

export default postReducer;