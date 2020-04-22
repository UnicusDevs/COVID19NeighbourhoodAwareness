import { SAVE_POST_DATA, SAVE_LATEST_POST_DATA, SAVE_ALL_POSTS_DATA, ADD_POST_TO_ALL_POSTS, SAVE_FILTERED_POSTS_DATA} from './allActions';

export const savePostDataToStore = postData => {
  return {type: SAVE_POST_DATA, postData};
};

export const saveLatestPostDataToStore = latestPostData => {
  return { type: SAVE_LATEST_POST_DATA, latestPostData}
}

export const saveAllPostsDataToStore = allPostsData => {
  return { type: SAVE_ALL_POSTS_DATA, allPostsData}
};

export const addNewPostToAllPostStore = newPost => {
  return { type: ADD_POST_TO_ALL_POSTS, newPost}
};

export const saveFilteredPostsToStore = filteredPosts => {
  return { type: SAVE_FILTERED_POSTS_DATA, filteredPosts}
}

