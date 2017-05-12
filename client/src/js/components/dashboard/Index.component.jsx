import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Navbar from '../common/nav.component';
import Searchbar from '../common/searchbar.component';
import AdminDashboard from './admin.component';
import UserDashboard from './user.component';
import { bindActionCreators } from 'redux';
import viewAllDocuments from '../../actions/documentManagement/readAllDocuments';
import * as docActions from '../../actions/documentManagement/readDocument.js';
import * as UserActions from '../../actions/userManagement/getAllUsers.js';
import * as RoleActions from '../../actions/roleManagement/getRoles.js';
import editUserActions from '../../actions/userManagement/editUser';

export class Dashboard extends Component {
  constructor(props) {
    super(props)
    const token = window.localStorage.getItem('token');
    this.updateUser = this.updateUser.bind(this);
    this.state = {
      AdminRoleId: 1,
      authUser: jwtDecode(token) || {},
      documents: props.documents || [],
      roles: props.roles || [],
      users: props.user || []
    }
  }

  componentWillMount() {
    const userId = this.state.authUser.userId || null
    this.props.viewAllDocuments();
    this.props.actionsUser.viewUsers(userId);
    this.props.actionsRole.viewRoles(userId);
    this.props.singleActionsDoc.viewUserDocuments(userId);
  }

  componentWillReceiveProps(nextProps){
    const keys = ['users', 'documents', 'roles'];
    keys.forEach(key=>{
      if(nextProps[key]){
        this.setState({
          [key]: nextProps[key]
        });
      }
    });
  }


  updateUser(values, id) {
    this.props.actionEditUser(values, id);
  }

  render() {
    const roleId = this.state.authUser.roleId || null;
    return (roleId === this.state.AdminRoleId) ?
      <div>
        <AdminDashboard {...this.props} pagination= {this.props.viewAllDocuments} updateUser={this.updateUser} />
      </div> :
      <div>
        <UserDashboard {...this.props} pagination= {this.props.viewAllDocuments} />
      </div>
  }
}

const mapStoreToProps = (state) => {
  return {
    documents: state.documentReducer.documents,
    documentPages: state.documentReducer.pageCount,
    searchDocuments: state.documentReducer.search,
    searchUsers: state.userReducer.search,
    users: state.userReducer.users,
    roles: state.roleReducer.roles
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewAllDocuments: bindActionCreators(viewAllDocuments, dispatch),
    singleActionsDoc: bindActionCreators(docActions, dispatch),
    actionsUser: bindActionCreators(UserActions, dispatch),
    actionsRole: bindActionCreators(RoleActions, dispatch),
    actionEditUser: bindActionCreators(editUserActions, dispatch)
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard);
