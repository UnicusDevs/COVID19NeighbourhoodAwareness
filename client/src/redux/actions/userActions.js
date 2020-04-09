import { SAVE_CURRENT_USER } from "./allActions";

export const setCurrentUser = (userData) => {
  return { type: SAVE_CURRENT_USER, userData };
};

