import React, { Component } from 'react';

class Login extends Component {
  /**
   * renders the Nav component
   * @returns {void}
   * @memberOf Login
   */
  render() {
    return (
      <div>
        <form className="loginForm">
          <h1 className="loginHeader">Login</h1>
          <input placeholder="email@example.com" type="email" required="" />
          <input placeholder="Password" type="password" required="" />
          <button className="loginButton">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;