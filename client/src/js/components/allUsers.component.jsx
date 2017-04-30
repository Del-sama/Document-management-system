import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';

const SingleUsers = (users, index) => {
  return (
    <tr className="hoverable" key={index}>
      <td>{users.firstName}</td>
      <td>{users.lastName}</td>
      <td>{users.email}</td>
      <td>{users.roleId}</td>
      <td>{(users.createdAt).slice(0, 10)}</td>
      <td>{(users.updatedAt).slice(0, 10)}</td>
      {/*<td><a className="modal-trigger green-text" href="#modal1" onClick={() => { props.setEditusers(users); }}><i className="material-icons">edit</i></a></td>
      <td><a className="red-text" href="#" onClick={() => { props.setDeleteusers(users.id); }} > <i className="material-icons">delete</i></a></td>*/}
    </tr >
  );
}
let usersList = [];
const UserDocs = (props) => {
  console.log('a2303023][;\;\[]]', props)

  if (props.users.users !== undefined) {
    usersList = props.users.users.data;
  }
  console.log('first=-=-=-', usersList);
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
          {usersList.map(SingleUsers)}
        </tbody>
      </table>
    </div>
  )
}

export default UserDocs;