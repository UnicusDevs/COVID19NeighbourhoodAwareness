import { SAVE_POST_DATA } from './allActions';

export const savePostDataToStore = postData => {
  return {type: SAVE_POST_DATA, postData};
};

