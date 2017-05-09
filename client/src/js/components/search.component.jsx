import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';


const Search = (props) => {
  const SingleDocument = (document, index) => {
    return (
      <tr className="hoverable" key={index} >
        <td>{document.title}</td>
        <td>{document.access}</td>
        <td className="truncate"><a href="#modalView" dangerouslySetInnerHTML={{ __html: document.content}} onClick={() => { props.setViewDocument(document); }} /></td>
        <td>{(document.createdAt).slice(0, 10)}</td>
        <td>{(document.updatedAt).slice(0, 10)}</td>
      </tr >
    );
  }
  const SingleUsers = (users, index) => {
    return (
      <tr className="hoverable" key={index}>
        <td>{users.firstName}</td>
        <td>{users.lastName}</td>
        <td>{users.email}</td>
        <td>{users.roleId}</td>
      </tr >
    );
  }
  const token = window.localStorage.getItem('token');
  let searchList = [];
  if (props.view === true) {
    if (props.searchDocuments !== undefined) {
      let docs = props.searchDocuments.data;
      searchList = props.searchDocuments.data;
    }
  } else if (props.view === false){
    if (props.searchUsers !== undefined) {
      let user = props.searchUsers.data;
      searchList = props.searchUsers.data;
    }
  }
  return (props.view === true) ?

    <div>
      <table id="documentSearch" className="bordered responsive">
        <thead>
          <tr>
            <th>Title</th>
            <th>Access</th>
            <th>Content</th>
            <th>Published date</th>
            <th>Updated date</th>
          </tr>
        </thead>
        <tbody>
          {searchList.map(SingleDocument)}
        </tbody>
      </table>
    </div> :
    <div>
      <table id="userSearch" className="bordered responsive">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role ID</th>
          </tr>
        </thead>
        <tbody>
          {searchList.map(SingleUsers)}
        </tbody>
      </table>
    </div>
}

export default Search;