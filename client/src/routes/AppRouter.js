import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import LandingPage from './../pages/LandingPage';
import LoginPage from './../pages/LoginPage';
import SignUpPage from './../pages/SignUpPage';
import signupModule from './../components/SignUpModule';
import NotFoundPage from './../pages/NotFoundPage';
import SignUpModule from './../components/SignUpModule';

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" component={LandingPage} exact={true} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signupmodule" component={SignUpModule} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    )
  }
};

export default AppRouter;
