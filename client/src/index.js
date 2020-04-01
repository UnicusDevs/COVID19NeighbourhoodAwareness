import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import AppRouter from './routes/AppRouter.js';
import { Provider } from "react-redux";

import configureStore from './redux/configureStore';

import './sass/main.scss'

const store = configureStore();
console.log(store.getState());

ReactDOM.render(<Provider store={store}><AppRouter /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();