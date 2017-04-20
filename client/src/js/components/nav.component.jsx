import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import logoutAction from '../actions/authorizationManagement/logoutAction';


class Navbar extends Component {

  constructor(props) {
    super(props);
    const token = (window.localStorage.getItem('token'));
    if (token) {
      this.state = { id: jwtDecode(token).UserId, userName: jwtDecode(token).userName};
      this.logout = this.logout.bind(this);
    }
  }

  logout() {
    window.localStorage.removeItem('token');
    this.props.logout();
    this.setState({
      id: null
    });
    browserHistory.push('/');
  }

  render() {
    if (window.localStorage.getItem('token')) {
      return (
          <nav>
            <div className="nav-wrapper">
              <Link to="/" className="brand-logo myContainer"><i className="material-icons">library_books</i>I-DocMan</Link>
              <Link to="#" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></Link>
              <ul className="right hide-on-med-and-down">
                <li className="upperCase">Welcome, {this.state.userName}</li>
                <li><Link id="logout" onClick={this.logout}>Sign Out</Link></li>
              </ul>
                <ul id="nav-mobile" className="right hide-on-med-and-down" />
            </div>
          </nav>
      );
    }
    return (
       <nav id= "nav">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo myContainer"><i className="material-icons">library_books</i>I-DocMan</Link>
          <Link to="#" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></Link>
          <ul className="right hide-on-med-and-down">
            <li><Link to="/app/login"><i className="material-icons left">lock_open  </i>LOGIN   </Link></li>
            <li><Link to="/app/signup"><i className="material-icons left">vpn_key    </i>SIGNUP  </Link></li>
          </ul>
          <ul className="side-nav" id="mobile">
            <li></li>
            <li><Link to="/app/login"><i className="material-icons left">lock_open  </i>LOGIN </Link></li>
            <li><Link to="/app/signup"><i className="material-icons left">vpn_key    </i>SIGNUP </Link></li>
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