import { combineReducers } from "redux";
import signUpFormReducer from './signUpFormReducer.js';
import popUpReducer from './popUpReducer.js';
import userReducer from './userReducer';

const allReducers = {
  signUpFormReducer: signUpFormReducer,
  popUpReducer: popUpReducer,
  userReducer: userReducer
};

const rootReducer = combineReducers(allReducers);
export default rootReducer;