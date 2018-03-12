import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './styles.scss'

class PasswordRecovery extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: ''
    }
  }

  handleChange = (field, evt) => {
    const { target: { type, value } } = evt

  }

  handleSubmit = evt => {
    evt.preventDefault()

  }

  render() {
    const { email } = this.state

    return (
      <div className="passwordRecoveryPage">
        <div className="wrapper">
          <div className="passwordRecoveryForm">
            <div className="passwordRecoveryForm__title">
              <img src="https://d1xvn5mjulg4qv.cloudfront.net/3.0.0/images/logo@3x.png" alt="" />
            </div>

            <div className="passwordRecoveryForm__content">
              <form onSubmit={this.handleSubmit}>
                <div>
                  <input className="field" placeholder="Email" type="email" onChange={evt => this.handleChange('email', evt)} value={email} required autoFocus />
                </div>
                <div>
                  <button className="large form button">Recover</button>
                </div>
                <div>
                  <NavLink to="/login">Return to login</NavLink>
                </div>
              </form>
            </div>
          </div>
          <p className="contactUs">
            <a href="mailto:support@boilerplatebuilder.com">Contact us</a>
          </p>
          <p className="copyRight">© Breck Inc. 2018, All Rights Reserved</p>
        </div>
        <button className="general-help-button">?</button>
      </div>
    )
  }
}

const actions = {

}

export default connect(null, actions)(PasswordRecovery)
