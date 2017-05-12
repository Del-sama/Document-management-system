import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import Navbar from '../common/nav.component';
import viewUserAction from '../../actions/userManagement/viewUser.js';


/**
 * Views user profile
 *
 * @class ViewUser
 * @extends {Component}
 */
class ViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      role: jwtDecode(window.localStorage.getItem('token')).roleId,
      userId: jwtDecode(window.localStorage.getItem('token')).userId
    };
  }

/**
 *
 * componentWillMount called when page is loaded
 * @param {object} nextProps
 *
 * @memberOf ViewUser
 */
  componentWillMount() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
    const token = window.localStorage.getItem('token');
    if (token) {
      this.setState({ userId: jwtDecode(token).userId });
      this.props.viewUser(token, jwtDecode(token).userId);
    }
  }

/**
 *
 * componentWillReceiveProps called when props are changed and page is re-rendered
 * @param {object} nextProps
 *
 * @memberOf ViewUser
 */
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.user);
  }


  /**
   * handleChange handles change events
   *
   * @param {any} event
   *
   * @memberOf ViewUser
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="mainContainer">
        <div className="bg"></div>
        <div className="row  col s12">
          <Navbar />
          <div className="col s12 user-profile">
            <div className="row "><h4>Profile</h4></div>
            <div className="doc_list z-depth-4 panel doc_content">
              <form className="userProfile" autoComplete="off">
                <div className="row">
                  <label htmlFor="userName">Username: </label>
                  <span>{this.state.userName}</span>
                </div>
                <div className="row">
                  <label htmlFor="email">Email: </label>
                  <span>{this.state.email}</span>
                </div>
                <div className="row">
                  <label htmlFor="firstName">First Name: </label>
                  <span>{this.state.firstName}</span>
                </div>
                <div className="row">
                  <label htmlFor="lastName">Last Name: </label>
                  <span>{this.state.lastName}</span>
                </div>
                <div className="row">
                  <label htmlFor="role">Role: </label>
                  <span className="userRole">{this.state.role}</span>
                </div>
                <div className="row">
                    <Link
                      to="/app/profile/edit"
                      className="btn waves-effect waves-light center"
                      id="edit-profile-btn"
                    >Edit Profile</Link>
                  </div>
              </form>
              <div />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStoreToProps = (state, ownProps) => {
  return {
    user: state.userReducer.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewUser: bindActionCreators(viewUserAction, dispatch)
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ViewUser);
