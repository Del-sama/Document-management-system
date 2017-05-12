import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import logoutAction from '../../actions/authorizationManagement/logoutAction';

/**
 *
 *
 * @export
 * @class Navbar the navbar of the application
 * @extends {Component}
 */
export class Navbar extends Component {

/**
 * Creates an instance of Navbar.
 * @param {object} props
 *
 * @memberOf Navbar
 */
  constructor(props) {
    super(props);
    const token = (window.localStorage.getItem('token'));
    if (token) {
      this.state = { id: jwtDecode(token).userId, userName: jwtDecode(token).userName};
      this.logout = this.logout.bind(this);
    }
  }


  /**
   * logout - logs users out
   *
   *
   * @memberOf Navbar
   */
  logout() {
    window.localStorage.removeItem('token');
    this.props.logout();
    this.setState({
      id: null
    });
    browserHistory.push('/app/');
  }

  render() {
    if (window.localStorage.getItem('token')) {
      return (
          <nav>
            <div className="nav-wrapper">
              <Link to="/app/" className="brand-logo myContainer"><i className="material-icons">library_books</i>i-DocMan</Link>
              <Link to="#" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></Link>
              <ul className="right hide-on-med-and-down">
                <li className="upperCase"><Link to="/app/profile" id="profile-btn"><i className="material-icons left">perm_identity</i>{this.state.userName}</Link></li>
                <li><Link onClick={this.logout} className="signout-btn"><i className="material-icons left">lock_outline</i>Sign Out</Link></li>
              </ul>
              <ul className="side-nav" id="mobile">
                <li className="upperCase"><Link to="/app/profile"><i className="material-icons left">perm_identity</i>{this.state.userName}</Link></li>
                <li><Link onClick={this.logout} className="signout-btn"><i className="material-icons left">lock_outline</i>Sign Out</Link></li>
              </ul>
            </div>
          </nav>
      );
    }
    return (
       <nav id= "nav">
        <div className="nav-wrapper">
          <Link to="/app/" className="brand-logo myContainer"><i className="material-icons">library_books</i>i-DocMan</Link>
          <Link to="#" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></Link>
          <ul className="right hide-on-med-and-down">
            <li><Link to="/app/login" className="login-btn"><i className="material-icons left" id="login">lock_open  </i>LOGIN   </Link></li>
            <li><Link to="/app/signup" className="signup-btn"><i className="material-icons left" id="signup">vpn_key    </i>SIGNUP  </Link></li>
          </ul>
          <ul className="side-nav" id="mobile">
            <li></li>
            <li><Link to="/app/login" className="login-btn"><i className="material-icons left">lock_open  </i>LOGIN </Link></li>
            <li><Link to="/app/signup" className="signup-btn"><i className="material-icons left">vpn_key    </i>SIGNUP </Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction())
  };
};
const mapStoreToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(Navbar);
