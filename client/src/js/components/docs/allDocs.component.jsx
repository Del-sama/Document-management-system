import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { Row, Col, Input, Button } from 'react-materialize';
import jwtDecode from 'jwt-decode';

const AllDocs = (props) => {
  let documentList;
  if (props.documents !== undefined) {
    documentList = props.documents.map((document) => {
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
            <th>Author</th>
            <th>Access</th>
            <th>Content</th>
            <th>Published date</th>
          </tr>
        </thead>
        <tbody>
          {documentList}
        </tbody>
      </table>
    </div>
  )
}


const SingleDocument = (props) => {
  const { document } = props
  return (
    <tr className="hoverable">
      <td>{document.title}</td>
      <td>{document.User.userName}</td>
      <td>{document.access}</td>
      <td className="truncate">{document.content}</td>
      <td>{(document.createdAt).slice(0, 10)}</td>
    </tr>
  );
}

export default AllDocs;
