import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';

export class AllDocs extends Component {
  constructor(props){
    super(props);
    this.state = {
      documents: props.documents || []
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.documents){
      this.setState({
        documents: nextProps.documents
      });
    }
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
            {this.state.documents.map(document =>
              <SingleDocument document={document} key={document.id} />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}


const SingleDocument = (props) => {
  const { document } = props
  return (
    <tr className="hoverable">
      <td className="doc-title">{document.title}</td>
      <td>{document.User.userName}</td>
      <td>{document.access}</td>
      <td className="truncate"><a href="#modalView" dangerouslySetInnerHTML={{ __html: document.content}} onClick={() => { props.setViewDocument(document); }} /></td>
      <td>{(document.createdAt).slice(0, 10)}</td>
    </tr>
  );
}

export default AllDocs;
