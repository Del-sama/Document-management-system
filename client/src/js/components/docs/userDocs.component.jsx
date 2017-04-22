import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';

const UserDocs = (props) => {
  let documentList;
  if (props.document.document !== undefined) {
    documentList = props.document.document.data.map((document) => {
    return (
        <SingleDocument document={document} key={document.id} />
      )
    })
  }
  return (
    <div>
      <table className="bordered">
        <thead>
          <tr>
              <th>Title</th>
              <th>Access</th>
              <th>Content</th>
              <th>Published date</th>
          </tr>
        </thead>
        <tbody>
          { documentList }
        </tbody>
      </table>
    </div>
  )
}


const SingleDocument = (props) => {
  const { document } = props
  return (
    <tr className="hoverable">
      <td>{ document.title }</td>
      <td>{ document.access }</td>
      <td className="truncate">{ document.content }</td>
      <td>{ (document.createdAt).slice(0, 10) }</td>
      <td><Link to="#" className="green-text"> <i className="material-icons">edit</i></Link></td>
      <td><Link to="#" className="red-text"> <i className="material-icons">delete</i></Link></td>
    </tr>
  );
}

export default UserDocs;