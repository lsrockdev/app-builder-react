import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { recoverPassword } from 'api/modules/auth'
import './styles.scss'

class NewPassword extends Component {

  constructor(props) {
    super(props)
    
    //const token = new URLSearchParams(this.props.location.search).get('token')

    const token = this.props.auth.token;

    // redirect if not logged in or token not defined
    if (this.props.auth.token === null)
        this.props.history.push("/documents");


    this.state = {
      password: '',
      confirmPassword: '',
      passwordsDontMatch: false,
      token
    }
  }

  componentDidMount(){
    this.passwordInput.focus();
  }

  handleChange = (field, evt) => {
    const { value } = evt.target

    this.setState({
      [field]: value,
    })

  }

  handleSubmit = evt => {
    evt.preventDefault()

    if(this.state.password !== this.state.confirmPassword) {
      this.setState({
        passwordsDontMatch: true
      });
      
      return;
    }

    const { recoverPassword } = this.props
    const { password, token } = this.state

    recoverPassword({ body: { password, token }, success: () => {this.props.history.push("/login");} } )
  }

  render() {
    const { password, confirmPassword } = this.state
    const { error } = this.props;

    let errorMessage = null;
    if(error) {
      errorMessage = <div>
                        <div style={{marginBottom: 15}}>
                          <div className="red message">
                            <span>{error.data}</span>
                          </div>
                        </div>
                      </div>
    }

    return (



      <div className="recoverPasswordPage">
        <div className="wrapper">
          <div className="recoverPasswordForm">
            <div className="recoverPasswordForm__title">
              <img src="https://d1xvn5mjulg4qv.cloudfront.net/3.0.0/images/logo@3x.png" alt="" />
            </div>

            <div className="recoverPasswordForm__content">
              {this.state.passwordsDontMatch &&
                <div className="red message" style={{marginBottom: "15px"}}><span>Passwords don't match.</span></div>}
              <form onSubmit={this.handleSubmit}>
                <div>
                  <input className="field" placeholder="New Password" type="password" onChange={evt => this.handleChange('password', evt)} value={password} ref={(input) => { this.passwordInput = input; }} required />
                </div>
                <div>
                  <input id="confirmPassword" className="field" placeholder="Confirm Password" type="password" onChange={evt => this.handleChange('confirmPassword', evt)} value={confirmPassword} required />
                </div>
                <div>
                  <button className="large form button">Set new password</button>
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

const mapStateToProps = ({auth}) => {
  return {auth}
};

const actions = {
  recoverPassword,
}

export default connect(mapStateToProps, actions)(NewPassword)
