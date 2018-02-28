import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { logOut } from 'api/modules/auth'
import { isAuthenticated } from 'api/selectors'
import './styles.scss'

class Header extends Component {
  static propTypes = {
    authenticated: PropTypes.bool,
    logOut: PropTypes.func,
  }

  render() {
    const { authenticated, logOut } = this.props

    return (
      <div className="app-bar">
        <div className="menu">
          <img src="https://d1xvn5mjulg4qv.cloudfront.net/3.0.0/images/logo_small.png" className="menu-logo" alt="" />
          <div className="right">
            <button>Library</button>
            <button>Documents</button>
            <button className="selected">Support</button>
            {authenticated && <button onClick={logOut}>Log out</button>}
          </div>
          <div className="clear" />
        </div>
      </div>
    )
  }
}

const selectors = createStructuredSelector({
  authenticated: isAuthenticated,
})

const actions = {
  logOut,
}

export default connect(selectors, actions)(Header)
