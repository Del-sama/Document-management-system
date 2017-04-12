import React, { Component } from 'react';

class Navbar extends Component {
  /**
   * Creates an instance of Navbar.
   * @param {any} props
   * @memberOf Navbar
   */
  constructor(props) {
    super(props);
  }
  /**
   * renders the Nav component
   * @returns {void}
   * @memberOf Navbar
   */
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <div className="brand-logo"><a href="/app/">Document Management System</a></div>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className={this.props.isLoginActive}>
              <a href="#">Login</a>
            </li>
            <li className={this.props.isSignupActive}>
              <a href="#">Signup</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.defaultProps = {
  isLoginActive: 'active',
  isSignupActive: ''
};
export default Navbar;