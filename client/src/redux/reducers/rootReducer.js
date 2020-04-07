import { combineReducers } from "redux";
import signUpFormReducer from './signUpFormReducer.js';
import popUpReducer from './popUpReducer.js';

const allReducers = {
  signUpFormReducer: signUpFormReducer,
  popUpReducer: popUpReducer

};

const rootReducer = combineReducers(allReducers);
export default rootReducer;