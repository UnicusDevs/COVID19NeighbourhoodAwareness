import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Header from './../components/Header';

// Pages
import HomePage from '../pages/homePage';
import LoginPage from './../pages/LoginPage';
import SignUpPage from './../pages/SignUpPage';
import NotFoundPage from './../pages/NotFoundPage';

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route path="/" component={HomePage} exact={true} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    )
  }
};

export default AppRouter;
