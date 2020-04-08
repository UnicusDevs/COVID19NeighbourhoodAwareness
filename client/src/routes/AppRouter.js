import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import HomePage from './../pages/HomePage';
import LoginPage from './../pages/LoginPage';
import SignUpPage from './../pages/SignUpPage';
import NotFoundPage from './../pages/NotFoundPage';

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <div>
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
