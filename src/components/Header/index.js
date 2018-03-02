import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { logOut } from 'api/modules/auth';
import { isAuthenticated } from 'api/selectors';
import './styles.scss';

const MenuItem = ({ to, label }) => (
  <Route
    path={to}
    children={({ match }) => (
      <Link to={to} className={match ? 'selected' : ''}>
        {label}
      </Link>
    )}
  />
);

class Header extends Component {
  static propTypes = {
    authenticated: PropTypes.bool,
    logOut: PropTypes.func
  };

  render() {
    const { authenticated, logOut } = this.props;

    return (
      <div className="app-bar">
        <div className="menu">
          <img src="https://d1xvn5mjulg4qv.cloudfront.net/3.0.0/images/logo_small.png" className="menu-logo" alt="" />
          <div className="right">
            <MenuItem to="/library" label="Library" />
            <MenuItem to="/documents" label="Documents" />
            <MenuItem to="/support" label="Support" />
            {authenticated && <a onClick={logOut}>Log out</a>}
          </div>
        </div>
      </div>
    );
  }
}

const selectors = createStructuredSelector({
  authenticated: isAuthenticated
});

const actions = {
  logOut
};

export default connect(selectors, actions)(Header);
