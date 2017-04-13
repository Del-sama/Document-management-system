import React, { Component } from 'react';

class Signup extends Component {
  /**
   * renders the Nav component
   * @returns {void}
   * @memberOf Signup
   */
  render() {
    return (
      <div>
        <form className="signinForm">
          <h1 className="signupHeader">Signup</h1>
          <input placeholder="username" type="text" required="" />
          <input placeholder="firstname" type="text" required="" />
          <input placeholder="lastname" type="text" required="" />
          <input placeholder="email@example.com" type="email" required="" />
          <input placeholder="Password" type="password" required="" />
          <button className="signupButton">Submit</button>
        </form>
      </div>
    );
  }
}

export default Signup;