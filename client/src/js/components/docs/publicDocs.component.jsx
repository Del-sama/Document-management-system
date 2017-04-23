import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';


const PublicDocs = (props) => {
  let documentList;
  if (props.document.document !== undefined) {

    documentList = props.document.document.data
    .filter((document) => {
      return document.access === 'public';
    })
    .map((document) => {
      return (
        <SingleDocument document={document} key={document.id} setEditDocument={props.setEditDocument}/>
      )
    })
  }
  return (
    <div>
      <table className="bordered responsive">
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
      <td>{(document.updatedAt).slice(0, 10)}</td>
      <td><a className="modal-trigger green-text" href="#modal1" onClick={()=>{ props.setEditDocument(document); }}><i className="material-icons">edit</i></a></td>
      <td><Link to="#" className="red-text"> <i className="material-icons">delete</i></Link></td>
    </tr>
  );
}

export default PublicDocs;