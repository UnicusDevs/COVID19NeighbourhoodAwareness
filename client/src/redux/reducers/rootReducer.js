import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from 'redux-form';
import signUpFormReducer from './signUpFormReducer.js';

const allReducers = {
  signUpFormReducer: signUpFormReducer,
  form: reduxFormReducer, 
};

const rootReducer = combineReducers(allReducers);
export default rootReducer;