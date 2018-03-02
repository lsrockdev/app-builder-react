import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from 'containers/Dashboard'
import LogIn from 'containers/LogIn'
import Documents from 'containers/Documents'
import Support from 'containers/Support';
import { userIsNotAuthenticatedRedir, userIsAuthenticatedRedir } from 'utils/authHelper'

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={userIsAuthenticatedRedir(Documents)} />
      <Route exact path="/documents" component={userIsAuthenticatedRedir(Documents)} />
      <Route exact path="/support" component={userIsAuthenticatedRedir(Support)} />
      <Route path="/login" component={userIsNotAuthenticatedRedir(LogIn)} />
    </div>
  </Router>
)

export default Routes
