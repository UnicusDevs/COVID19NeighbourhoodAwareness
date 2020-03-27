import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes/AppRouter.js';
import { Provider } from 'react-redux';
import './App.css';

// Store 
import configureStore from './redux/store';
const store = configureStore();

class App extends Component {
  state = {
    data: null
  };

  

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App;



