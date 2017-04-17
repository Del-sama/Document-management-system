import React, { Component } from 'react';
// import Link from react-router-dom;

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
          <div className="brand-logo"><a href="/">Document Management System</a></div>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className={this.props.isSignupActive}>
              <a href="/app/signup">Signup</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.defaultProps = {
  isSignupActive: ''
};
export default Navbar;