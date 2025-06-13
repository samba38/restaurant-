import {Component, useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSucessLogin = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSucessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  render() {
    const {errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dglv9osd0/image/upload/v1749468845/isx_wbxa23.png"
          className="hotel-login-img"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://res.cloudinary.com/dglv9osd0/image/upload/v1749537103/oou_qr8alt.webp"
            className="hotel-login-logo"
          />
          <h1 className="hotel-heading">Hotel Login</h1>
          <div className="input-card">
            <label htmlFor="userText" className="label-head">
              USERNAME
            </label>
            <input
              type="text"
              id="userText"
              className="login-user"
              placeholder="USERNAME"
              onChange={this.onChangeUserName}
            />
          </div>
          <div className="input-card">
            <label htmlFor="passwordText" className="label-head">
              PASSWORD
            </label>
            <input
              type="password"
              id="passwordText"
              className="login-user"
              placeholder="PASSWORD"
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="hotel-login-btn">
            Login
          </button>
          {errorMsg !== '' && <p className="login-error-msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
