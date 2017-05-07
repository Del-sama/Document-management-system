import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';

export class AllDocs extends Component {
  constructor(props){
    super(props);
    this.singleDocument = this.singleDocument.bind(this);
    this.state = {
      documents: props.documents || [],
      setViewDocument: props.setViewDocument
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.documents){
      this.setState({
        documents: nextProps.documents
      });
    }
  }

  singleDocument (document, index) {
    return (
      <tr className="hoverable" key={index}>
        <td className="doc-title">{document.title}</td>
        <td>{document.User.userName}</td>
        <td>{document.access}</td>
        <td className="truncate"><a href="#modalView" dangerouslySetInnerHTML={{ __html: document.content}} onClick={() => { this.props.setViewDocument(document); }} /></td>
        <td>{(document.createdAt).slice(0, 10)}</td>
      </tr>
    );
  }

  render(){
    return (
      <div>
        <table className="bordered" id="document-list">
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
            {this.state.documents.map(this.singleDocument)}
          </tbody>
        </table>
      </div>
    )
  }
}


export default AllDocs;
