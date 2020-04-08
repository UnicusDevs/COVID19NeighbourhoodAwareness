import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const noDevTool = applyMiddleware(
  thunk

);

const composeEnhancers =
  process.env.REACT_APP_NODE_ENV === "production"
    ? noDevTool
    : composeWithDevTools({ trace: true, traceLimit: 25 })(noDevTool);

const store = createStore(rootReducer, composeEnhancers);

export default store;