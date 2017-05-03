import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import deleteUserAction from '../actions/userManagement/deleteUser.js';

const SingleUserComponent = ({user, deleteUser}) => {
  return (
      <tr className="hoverable">
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.roleId}</td>
        <td>{user.createdAt.slice(0, 10)}</td>
        <td>{user.updatedAt.slice(0, 10)}</td>
        <td><Link to='/app/user/role-edit'><a className="green-text"><i className="material-icons">edit</i></a></Link></td>
        <td><a className="red-text" href="#" onClick={() => deleteUser(user.id)} > <i className="material-icons">delete</i></a></td>
    </tr >
  );
}

export default class allUsers extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: []
    }
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.users){
      this.setState({
        users: nextProps.users
      });
    }
  }

  deleteUser(userId){
    // const userId = jwtDecode(this.state.token).userId;
    this.props.deleteUser(userId);
    Materialize.toast('User deleted!', 3000);
  }
  render(){
    return (
      <div>
        <table className="bordered  responsive">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role ID</th>
              <th>Created date</th>
              <th>Updated date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user =>
              <SingleUserComponent user={user} key={user.id} deleteUser={this.deleteUser}/>
            )}
          </tbody>
        </table>
      </div>
    )
  };
}

