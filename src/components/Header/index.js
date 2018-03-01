import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom';
import { createStructuredSelector } from 'reselect'
import { logOut } from 'api/modules/auth'
import { isAuthenticated } from 'api/selectors'
import './styles.scss'

class Header extends Component {
  static propTypes = {
    authenticated: PropTypes.bool,
    logOut: PropTypes.func,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  componentWillMount() {

  }
  handleMenuClick = name => {
    switch (name) {
      case 'documents':
        this.props.history.push('/documents')
        return
      case 'support':
        this.props.history.push('/support')
        return
      default:
        this.props.history.push('/')
        return
    }
  }

  render() {
    const { authenticated, logOut, location} = this.props

    return (
      <div className="app-bar">
        <div className="menu">
          <img src="https://d1xvn5mjulg4qv.cloudfront.net/3.0.0/images/logo_small.png" className="menu-logo" alt="" />
          <div className="right">
            <button>Library</button>
            <button className={location.pathname=== '/documents' ? 'selected' : ''} onClick={() => this.handleMenuClick('documents')}>Documents</button>
            <button className={location.pathname=== '/support' ? 'selected' : ''} onClick={() => this.handleMenuClick('support')}>Support</button>
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

export default connect(selectors, actions)(withRouter(Header))