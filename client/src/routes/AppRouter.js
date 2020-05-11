import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import HomePage from '../pages/HomePage';
import LoginPage from './../pages/LoginPage';
import SignUpPage from './../pages/SignUpPage';
import ProfilePage from './../pages/ProfilePage';
import NotFoundPage from './../pages/NotFoundPage';

const AppRouter = (props) =>  {

    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" component={HomePage} exact={true} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/user/:id" component={ProfilePage} />
            <Route component={HomePage} />
          </Switch>
        </div>
      </Router>
    )
  };

export default AppRouter;
