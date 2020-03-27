import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

// Pages
import LandingPage from './../pages/LandingPage';
import LoginPage from './../pages/LoginPage';
import SignUpPage from './../pages/SignUpPage';
import NotFoundPage from './../pages/NotFoundPage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={LandingPage} exact={true} />
        <Route path="/login" component={LoginPage} />
        <Route path="/SignUp" component={SignUpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
