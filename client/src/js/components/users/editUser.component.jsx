import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../common/nav.component';
import viewUserAction from '../../actions/userManagement/viewUser.js';
import editUserAction from '../../actions/userManagement/editUser.js';


/**
 * EditUser edits user details
 *
 * @export
 * @class EditUser
 * @extends {Component}
 */
export class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      role: '',
      token: localStorage.getItem('token')
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

/**
 *
 * componentWillMount called when page is loaded
 * @param {object} nextProps
 *
 * @memberOf EditUser
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
 * @memberOf EditUser
 */
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.user);
  }

/**
 * handleChange handles change events
 *
 * @param {object} event
 *
 * @memberOf EditUser
 */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state, 'this.state');
  }

/**
 * UpdateUser edits user details
 *
 * @param {object} event
 *
 * @memberOf EditUser
 */
  updateUser(event) {
    event.preventDefault()
    const userId = jwtDecode(this.state.token).userId;
    console.log(this.state);
    const details = {
      userName: this.state.userName,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password
    }
    if(this.state.password === this.state.confirmPassword){
        this.props.updateUser(details, userId);
      }else {
        Materialize.toast('Passwords don\'t match!', 3000)
      }
  }

  render() {
    return (
      <div className="mainContainer">
        <div className="bg"></div>
        <div className="row dashboardContainer col s12">
          <Navbar />
          <div className="col s12 workspace user-profile">
            <div className="row workspace-header"><h4>Edit Profile</h4></div>
            <div className="doc_list z-depth-4 panel doc_content">
              <form className="userProfile" onSubmit={this.updateUser}>
                <label htmlFor="userName">Username: </label>
                <input
                  type="text"
                  name="userName"
                  id="username"
                  value={this.state.userName}
                  onChange={this.handleChange}
                />
                <label htmlFor="firstName">First Name: </label>
                <input
                  type="text"
                  name="firstName"
                  id="first_name"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
                <label htmlFor="lastName">Last Name: </label>
                <input
                  type="text"
                  name="lastName"
                  id="last_name"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                  value={this.state.password}
                  onChange={this.handleChange}
                  name="password"
                  id="password"
                  type="password"
                  className="validate"
                  required />
                <label  htmlFor="confirmPassword">Confirm Password</label>
                <input
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  className="validate"
                  required />
                <div className="row">
                  <button
                    type="submit"
                    className="updateUser btn"
                  >Update Profile</button>
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


EditUser.propTypes = {
  viewUser: PropTypes.func.isRequired
};


const mapStoreToProps = (state, ownProps) => {
  return {
    user: state.userReducer.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewUser: (usertoken, userId) => dispatch(viewUserAction(usertoken, userId)),
    updateUser: (userDetails, userId) =>
    dispatch(editUserAction(userDetails, userId)),
    deleteUser: (userId) => dispatch(deleteUserAction(userId))
  };

};

export default connect(mapStoreToProps, mapDispatchToProps)(EditUser);
