import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './styles.scss'

class SignUp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (field, evt) => {
    const { value } = evt.target

    this.setState({
      [field]: value,
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()

  }

  render() {
    const { email, password } = this.state

    return (
      <div className="signupPage">
        <div className="wrapper">
          <div className="signupForm">
            <div className="signupForm__title">
              <img src="https://d1xvn5mjulg4qv.cloudfront.net/3.0.0/images/logo@3x.png" alt="" />
            </div>

            <div className="signupForm__content">
              <form onSubmit={this.handleSubmit}>
                <div>
                  <input className="field" placeholder="Email" type="email" onChange={evt => this.handleChange('email', evt)} value={email} required autoFocus />
                </div>
                <div>
                  <input className="field" placeholder="Password" type="password" onChange={evt => this.handleChange('password', evt)} value={password} required />
                </div>
                <div>
                  <button className="large form button">Sign up</button>
                </div>
                <div>
                  <NavLink to="/login">Sign in</NavLink>
                  <span>|</span>
                  <NavLink to="/password-recovery">Reset password</NavLink>
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

export default connect(null, actions)(SignUp)
