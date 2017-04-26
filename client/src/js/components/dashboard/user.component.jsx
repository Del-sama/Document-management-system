import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import Navbar from '../nav.component';
import Searchbar from '../searchbar.component';
import UserDocs from '../docs/userDocs.component';
import PrivateDocs from '../docs/privateDocs.component';
import PublicDocs from '../docs/publicDocs.component';
import RoleDocs from '../docs/roleDocs.component';
import AllDocs from '../docs/allDocs.component';
import CreateDocument from '../docs/docForm.component'
import EditDocument from '../../actions/documentManagement/editDocument';
import DeleteDocument from '../../actions/documentManagement/deleteDocuments';


class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.setEditDocument = this.setEditDocument.bind(this);
    this.setDeleteDocument = this.setDeleteDocument.bind(this);
    this.state = {};
  }

  setEditDocument(document){
    console.log(document, 'to edit');
    this.setState({
      editDocument: document,
      documentId: document.id
    });
  }

  setDeleteDocument(documentId) {
    this.props.DeleteDocument(documentId);
  }

  componentDidMount() {
    $('ul.tabs').tabs();
  }
  render() {

    return (
      <div>
        <div id="modal1" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4>Edit Document</h4>
            <CreateDocument document={this.state.editDocument || null} documentId={this.state.documentId || null}  onEdit={this.props.EditDocument}/>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Done</a>
          </div>
        </div>

        <div className="mainContainer">
          <div className="bg"></div>
          <Navbar />
          <Searchbar />
          <div className="row">
            <div className="tabRow">
              <ul className="tabs tabs-fixed-width">
                <li className="tab "><Link to="#test3" className="active">My Docs</Link>
                </li>
                <li className="tab "><Link to="#test1">Private Docs</Link></li>
                <li className="tab "><Link to="#test2">Public Docs</Link></li>
                <li className="tab "><Link to="#test4">Role Docs</Link></li>
                <li className="tab "><Link to="#test5">Other Docs</Link></li>
              </ul>
            </div>
            <div id="test3" className="tabContent col s12">
              <UserDocs document={this.props.document} setEditDocument={this.setEditDocument} setDeleteDocument={this.setDeleteDocument}/>
            </div>
            <div id="test1" className="tabContent col s12">
              <PrivateDocs document={this.props.documents} setEditDocument={this.setEditDocument} setDeleteDocument={this.setDeleteDocument} />
            </div>
            <div id="test2" className="tabContent col s12">
              <PublicDocs document={this.props.documents} setEditDocument={this.setEditDocument} setDeleteDocument={this.setDeleteDocument}/>
            </div>
            <div id="test4" className="tabContent col s12">
              <RoleDocs document={this.props.documents} setEditDocument={this.setEditDocument} setDeleteDocument={this.setDeleteDocument}/>
            </div>
            <div id="test5" className="tabContent col s12">
            <AllDocs document={this.props.documents} />
          </div>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    EditDocument: (documentDetails, documentId) => dispatch(EditDocument(documentDetails, documentId)),
    DeleteDocument: (documentId) => dispatch(DeleteDocument(documentId))

  };
};

export default connect(null, mapDispatchToProps)(UserDashboard);
