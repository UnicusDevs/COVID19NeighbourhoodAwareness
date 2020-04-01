import {createStore, combineReducers} from 'redux';
import { reducer as reduxFormReducer} from 'redux-form';

// Import Reducers
import { userReducer } from './reducers/userReducer';

export default () => {
  const store = createStore(
    combineReducers({
      form: reduxFormReducer,
      userReducer
    })
  );

  return store
};