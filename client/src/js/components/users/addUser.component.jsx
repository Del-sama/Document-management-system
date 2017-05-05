import React, { Component } from 'react';
import { Link } from 'react-router';
import CreateUser from './signUpPage.jsx';

class AddUser extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="inline">
        <Link data-target="modalUser" id="createUser" className="waves-effect waves-light btn-large createDoc">
          <i className="material-icons left">add_circle_outline</i>
          Add User
        </Link>
        <div id="modalUser" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4>Create a User</h4>
            <CreateUser />
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Done</a>
          </div>
        </div>
      </div>
    )
  }
}

export default AddUser;