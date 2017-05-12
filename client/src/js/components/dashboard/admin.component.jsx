import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { Pagination } from 'react-materialize';
import Navbar from '../common/nav.component';
import Searchbar from '../common/searchbar.component';
import AllDocs from '../docs/allDocs.component';
import Users from '../users/allUsers.component';
import Roles from '../roles/allRoles.component';
import UserDocs from '../docs/userDocs.component';
import Search from '../search.component.jsx';
import CreateDocument from '../docs/docForm.component';
import deleteUserAction from '../../actions/userManagement/deleteUser';
import EditDocument from '../../actions/documentManagement/editDocument';
import DeleteDocument from '../../actions/documentManagement/deleteDocuments';


/**
 *
 *
 * @class AdminDashboard the dashboard admin users see
 * @extends {Component}
 */
class AdminDashboard extends Component {

/**
 * Creates an instance of AdminDashboard.
 * @param {object} props
 *
 * @memberOf AdminDashboard
 */
  constructor(props) {
    super(props);
    this.setEditDocument = this.setEditDocument.bind(this);
    this.setDeleteDocument = this.setDeleteDocument.bind(this);
    this.setViewDocument = this.setViewDocument.bind(this);
    this.handleSearchBarView = this.handleSearchBarView.bind(this);
    const token = window.localStorage.getItem('token');
    this.state = {
      AdminRoleId: 1,
      searchBarView: 'noShow',
      documents: props.documents || [],
      users: props.users || [],
      roles: props.roles || [],
    };
  }


  /**
   * handleSearchBarView - handles search bar view
   *
   * @param {object} view
   *
   * @memberOf AdminDashboard
   */
  handleSearchBarView(view) {
    this.setState({ searchBarView: view });
    $('ul.tabs').tabs('select_tab', 'searchTab');
  }


  /**
   * close modal- closes modals
   *
   * @param {object} event
   *
   * @memberOf AdminDashboard
   */
  closeModal(event) {
    event.preventDefault();
    $('.modal').modal('close');
  }

/**
 *
 * setviewDocument opens full version of truncated documents
 * @param {file} document
 *
 * @memberOf AdminDashboard
 */
  setViewDocument(document) {
    this.setState({
      viewTitle: document.title,
      viewDocument: document.content,
      documentId: document.id
    });
  }

/**
 *
 * setEditDocument edits created documents
 * @param {file} document
 *
 * @memberOf AdminDashboard
 */
  setEditDocument(document){
    this.setState({
      editDocument: document,
      documentId: document.id
    });
    browserHistory.push('/app/dashboard');
  }

/**
 *
 * setDeleteDocument deletes documents
 * @param {number} documentId
 *
 * @memberOf AdminDashboard
 */
  setDeleteDocument(documentId) {
    this.props.DeleteDocument(documentId);
    browserHistory.push('/app/dashboard');
    Materialize.toast('Document deleted', 1000, 'red')
  }


/**
 *
 * componentWillReceiveProps called when props are changed and page is re-rendered
 * @param {object} nextProps
 *
 * @memberOf AdminDashboard
 */
  componentWillReceiveProps(nextProps){
    const keys = ['users', 'documents', 'roles'];
    keys.forEach(key=>{
      if(key === 'users' && nextProps[key]){
        this.setState({
          users: nextProps[key].users
        }, ()=>{
        })
      }
      else if(nextProps[key]){
        this.setState({
          [key]: nextProps[key]
        });
      }
    });
  }

/**
 *componentDidMount called once render has been executed
 *
 * @memberOf AdminDashboard
 */
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
            <a href="" className="modal-action waves-effect waves-green btn-flat " onClick={this.closeModal}>Close</a>
          </div>
        </div>

        <div id="modal1" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4>Edit Document</h4>
            <CreateDocument document={this.state.editDocument || null} documentId={this.state.documentId || null}  onEdit={this.props.EditDocument}/>
          </div>
        </div>

        <div className="mainContainer">
        <div className="bg"></div>
          <Navbar />
          <Searchbar handleSearchBarView={this.handleSearchBarView}/>
          <div className="row">
            <div className="tabRow">
              <ul className="tabs tabs-fixed-width">
                <li className="tab"><Link to="#test1" className="active allDocs-btn">All Docs</Link></li>
                <li className="tab"><Link to="#test2" className="myDocs-btn">My Docs</Link></li>
                <li className="tab"><Link to="#test3" className="allUsers-btn">Users</Link></li>
                <li className="tab"><Link to="#test4" className="allRoles-btn">Roles</Link></li>
                <li className="tab"><Link to="#searchTab">Search</Link></li>
              </ul>
            </div>

            <div id="test1" className="tabContent col s12">
              <center className="pagination-key">
                <Pagination id="allPagination" className="pag"
                  items={this.props.documentPages}
                  maxButtons={8}
                  onSelect={(page) => {
                    const offset = (page - 1) * 10;
                    this.props.pagination(offset);
                  }}
                  />
              </center>
              <AllDocs documents={this.state.documents} setViewDocument={this.setViewDocument}/>
            </div>
            <div id="test2" className="tabContent col s12">
              <UserDocs documents={this.state.documents} setEditDocument={this.setEditDocument} setViewDocument={this.setViewDocument} setDeleteDocument={this.setDeleteDocument}/>
            </div>
            <div id="test3" className="tabContent col s12">
              <Users updateUser={this.props.updateUser} users={this.state.users} roles={this.state.roles} deleteUser={this.props.deleteUser}/>
            </div>
            <div id="test4" className="tabContent col s12">
              <Roles roles={this.state.roles} />
            </div>
            <div id="searchTab" className="tabContent col s12">
              <Search searchDocuments={this.props.searchDocuments} setViewDocument={this.setViewDocument} searchUsers={this.props.searchUsers} view= {this.state.searchBarView} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    EditDocument: (documentDetails, documentId) => dispatch(EditDocument(documentDetails, documentId)),
    DeleteDocument: (documentId) => dispatch(DeleteDocument(documentId)),
    viewUser: (usertoken, userId) => dispatch(viewUserAction(usertoken, userId)),
    deleteUser: (userId) => dispatch(deleteUserAction(userId))
  };
}

export default connect(null,mapDispatchToProps)(AdminDashboard);

