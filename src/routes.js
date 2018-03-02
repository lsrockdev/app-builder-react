import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from 'containers/Dashboard';
import Library from 'containers/Library';
import LogIn from 'containers/LogIn';
import { userIsNotAuthenticatedRedir, userIsAuthenticatedRedir } from 'utils/authHelper';

const Routes = () => (
  <Router>
    <Switch>
      <Redirect exact from="/" to="support" />
      <Route exact path="/library" component={userIsAuthenticatedRedir(Library)} />
      <Route exact path="/support" component={userIsAuthenticatedRedir(Dashboard)} />
      <Route path="/login" component={userIsNotAuthenticatedRedir(LogIn)} />
    </Switch>
  </Router>
);

export default Routes;
