import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Navbar from '../common/nav.component';
import viewUserAction from '../../actions/userManagement/viewUser.js';
import editUserAction from '../../actions/userManagement/editUser.js';


/**
 * Edits users role
 *
 * @export
 * @class EditUsersRole
 * @extends {Component}
 */
export class EditUsersRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleId: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

/**
 *
 * componentWillReceiveProps called when props are changed and page is re-rendered
 * @param {object} nextProps
 *
 * @memberOf EditUserRole
 */
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.user);
  }

/**
   * handleChange handles change events
   *
   * @param {object} event
   *
   * @memberOf EditUserRole
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

/**
 * UpdateUser edits user details
 *
 * @param {object} event
 *
 * @memberOf EditUserRole
 */
  updateUser(event) {
    this.props.updateUser(this.state);
  }

  render() {
    return (
      <div className="row dashboardContainer col s12">
        <Navbar />
        <div className="col s12 workspace ">
          <div className="row workspace-header"><h4>Edit Role</h4></div>
          <div className="doc_list z-depth-4 panel doc_content">
            <form className="userProfile">
              <label htmlFor="roleId">RoleId: </label>
              <input
                type="number"
                name="roleId"
                id="roleId"
                value={this.state.roleId}
                onChange={this.handleChange}
              />
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


const mapStoreToProps = (state, ownProps) => {
  return {
    user: state.userReducer.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (usertoken, userDetails, userId) =>
    dispatch(editUserAction(userDetails, userId))
  };

};

export default connect(mapStoreToProps, mapDispatchToProps)(EditUsersRole);
