import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import Navbar from '../common/nav.component';
import Searchbar from '../common/searchbar.component';
import UserDocs from '../docs/userDocs.component';
import PrivateDocs from '../docs/privateDocs.component';
import PublicDocs from '../docs/publicDocs.component';
import RoleDocs from '../docs/roleDocs.component';
import AllDocs from '../docs/allDocs.component';
import CreateDocument from '../docs/docForm.component';
import EditDocument from '../../actions/documentManagement/editDocument';
import DeleteDocument from '../../actions/documentManagement/deleteDocuments';
import Search from '../search.component.jsx';

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.setEditDocument = this.setEditDocument.bind(this);
    this.setDeleteDocument = this.setDeleteDocument.bind(this);
    this.setViewDocument = this.setViewDocument.bind(this);
    this.handleSearchBarView = this.handleSearchBarView.bind(this);
    this.state = {
      searchBarView: 'noShow'
    };
  }

  handleSearchBarView(view) {
    this.setState({ searchBarView: view });
    $('ul.tabs').tabs('select_tab', 'searchTab');
  }

  setViewDocument(document) {
    this.setState({
      viewTitle: document.title,
      viewDocument: document.content,
      documentId: document.id
    });
  }

  setEditDocument(document){
    this.setState({
      editDocument: document,
      documentId: document.id
    });
    browserHistory.push('/app/dashboard');
  }

  setDeleteDocument(documentId) {
    this.props.DeleteDocument(documentId);
    browserHistory.push('/app/dashboard');
    Materialize.toast('Document deleted', 3000)
  }

  componentDidMount() {
    $('ul.tabs').tabs();
  }
  render() {

    return (
      <div>

        <div id="modalView" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4 className="center">View Document</h4>
            <h5>Title</h5>
            <div>{ this.state.viewTitle }</div>
            <h5>Content</h5>
            <div dangerouslySetInnerHTML={{ __html: this.state.viewDocument}} />
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Cancel</a>
          </div>
        </div>

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
          <Searchbar handleSearchBarView={this.handleSearchBarView}/>
          <div className="row">
            <div className="tabRow">
              <ul className="tabs tabs-fixed-width">
                <li className="tab "><Link to="#test3" className="active">My Docs</Link>
                </li>
                <li className="tab "><Link to="#test1">Private Docs</Link></li>
                <li className="tab "><Link to="#test2">Public Docs</Link></li>
                <li className="tab "><Link to="#test4">Role Docs</Link></li>
                <li className="tab "><Link to="#test5">All Docs</Link></li>
                <li className="tab"><Link to="#searchTab">Search</Link></li>
              </ul>
            </div>
            <div id="test3" className="tabContent col s12">
              <UserDocs documents={this.props.documents} setViewDocument={this.setViewDocument} setEditDocument={this.setEditDocument} setDeleteDocument={this.setDeleteDocument}/>
            </div>
            <div id="test1" className="tabContent col s12">
              <PrivateDocs documents={this.props.documents} setEditDocument={this.setEditDocument} setDeleteDocument={this.setDeleteDocument} />
            </div>
            <div id="test2" className="tabContent col s12">
              <PublicDocs documents={this.props.documents} setEditDocument={this.setEditDocument} setDeleteDocument={this.setDeleteDocument}/>
            </div>
            <div id="test4" className="tabContent col s12">
              <RoleDocs documents={this.props.documents} setEditDocument={this.setEditDocument} setDeleteDocument={this.setDeleteDocument}/>
            </div>
            <div id="test5" className="tabContent col s12">
              <AllDocs documents={this.props.documents} setViewDocument={this.setViewDocument} />
            </div>
            <div id="searchTab" className="tabContent col s12">
              <Search searchDocuments={this.props.searchDocuments} setViewDocument={this.setViewDocument} searchUsers={this.props.searchUsers} view= {this.state.searchBarView} />
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
