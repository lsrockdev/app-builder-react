import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from 'containers/Dashboard'
import LogIn from 'containers/LogIn'
import { userIsNotAuthenticatedRedir, userIsAuthenticatedRedir } from 'utils/authHelper'

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={userIsAuthenticatedRedir(Dashboard)} />
      <Route path="/login" component={userIsNotAuthenticatedRedir(LogIn)} />
    </div>
  </Router>
)

export default Routes
