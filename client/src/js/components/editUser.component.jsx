import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import React, { Component, PropTypes } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import viewUserAction from '../actions/userManagement/viewUser.js';
import editUserAction from '../actions/userManagement/editUser.js';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      password: '',
      role: '',
      token: localStorage.getItem('token')
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentWillMount() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
    const token = window.localStorage.getItem('token');
    if (token) {
      this.setState({ userid: jwtDecode(token).user.id });
      this.props.viewUser(token, jwtDecode(token).user.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.user);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  updateUser(event) {
    const userId = jwtDecode(this.state.token).user.id;
    this.props.updateUser(this.state.token, this.state, userId);
  }

  render() {
    return (
      <div className="row dashboardContainer col s12">
        <Header />
        <Sidebar />
        <div className="col s12 workspace ">
          <div className="row workspace-header"><h4>Profile</h4></div>
          <div className="doc_list z-depth-4 panel doc_content">
            <form className="userProfile">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                name="username"
                id="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <label htmlFor="first_name">First Name: </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                value={this.state.first_name}
                onChange={this.handleChange}
              />
              <label htmlFor="last_name">Last Name: </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                value={this.state.last_name}
                onChange={this.handleChange}
              />
              <label htmlFor="password">Password: </label>
              <span>********</span>
              <Link
                to="/change-password"
                id="changePassword"
                className="btn"
              >Change</Link>
              <div className="row">
                <button
                  type="submit"
                  className="updateUser btn"
                  onClick={this.updateUser}
                >Save</button>
              </div>
            </form>
            <div />
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
    user: state.viewUserReducer.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewUser: (usertoken, userid) => dispatch(viewUserAction(usertoken, userid)),
    updateUser: (usertoken, userDetails, userId) =>
    dispatch(editUserAction(usertoken, userDetails, userId))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(EditUser);
