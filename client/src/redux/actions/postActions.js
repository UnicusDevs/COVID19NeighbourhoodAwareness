import { SAVE_POST_DATA, SAVE_LATEST_POST_DATA, SAVE_ALL_POSTS_DATA} from './allActions';

export const savePostDataToStore = postData => {
  return {type: SAVE_POST_DATA, postData};
};

export const saveLatestPostDataToStore = latestPostData => {
  return { type: SAVE_LATEST_POST_DATA, latestPostData}
}

export const saveAllPostsDataToStore = allPostsData => {
  return { type: SAVE_ALL_POSTS_DATA, allPostsData}
};

