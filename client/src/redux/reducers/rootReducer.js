import { combineReducers } from "redux";
import signUpFormReducer from './signUpFormReducer.js';
import popUpReducer from './popUpReducer.js';
import userReducer from './userReducer';
import postReducer from './postReducer';

const allReducers = {
  signUpFormReducer: signUpFormReducer,
  popUpReducer: popUpReducer,
  userReducer: userReducer,
  postReducer: postReducer
};

const rootReducer = combineReducers(allReducers);
export default rootReducer;