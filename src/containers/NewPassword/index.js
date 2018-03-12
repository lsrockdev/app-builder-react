import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { recoverPassword } from 'api/modules/auth'
import './styles.scss'

class NewPassword extends Component {

  constructor(props) {
    super(props)

    const token = new URLSearchParams(this.props.location.search).get('token')

    this.state = {
      password: '',
      passwordConfirm: '',
      token
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
    const { recoverPassword } = this.props
    recoverPassword({ body: { ...this.state } })
  }

  render() {
    const { password, passwordConfirm } = this.state

    return (
      <div className="recoverPasswordPage">
        <div className="wrapper">
          <div className="recoverPasswordForm">
            <div className="recoverPasswordForm__title">
              <img src="https://d1xvn5mjulg4qv.cloudfront.net/3.0.0/images/logo@3x.png" alt="" />
            </div>

            <div className="recoverPasswordForm__content">
              <form onSubmit={this.handleSubmit}>
                <div>
                  <input className="field" placeholder="New Password" type="password" onChange={evt => this.handleChange('password', evt)} value={password} required />
                </div>
                <div>
                  <input className="field" placeholder="Confirm Password" type="password" onChange={evt => this.handleChange('passwordConfirm', evt)} value={passwordConfirm} required />
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
  recoverPassword,
}

export default connect(null, actions)(NewPassword)
