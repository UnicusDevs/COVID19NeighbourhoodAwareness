import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

// Pages
import LandingPage from './../pages/LandingPage';

const AppRouter = () => {
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={LandingPage} exact={true} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
}