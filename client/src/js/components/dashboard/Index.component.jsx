import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Navbar from '../nav.component';
import Searchbar from '../searchbar.component';
import AdminDashboard from './admin.component';
import UserDashboard from './user.component';
import { bindActionCreators } from 'redux';
import * as AllDocActions from '../../actions/documentManagement/readAllDocuments';
import * as UserActions from '../../actions/userManagement/getAllUsers.js';
import * as RoleActions from '../../actions/roleManagement/getRoles.js';
import editUserActions from '../../actions/userManagement/editUser';

class Dashboard extends Component {
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
    this.props.actionsDoc.viewAllDocuments(userId);
    this.props.actionsUser.viewUsers(userId);
    this.props.actionsRole.viewRoles(userId);
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

  componentDidMount() {
    $('.modal').modal({
      dismissible: false, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
      // ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
      //   alert("Ready");
      //   console.log(modal, trigger);
      // },
      // complete: function () { alert('Closed'); } // Callback for Modal close
    });
  }

  updateUser(values, id) {
    this.props.actionEditUser(values, id);
  }

  render() {
    const roleId = this.state.authUser.roleId || null
    return (roleId === this.state.AdminRoleId) ?
      <div>
        <AdminDashboard documents={this.props.documents} users={this.props.users} roles={this.props.roles}/>
      </div> :
      <div>
        <UserDashboard documents={this.props.documents} />
      </div>
  }
}

const mapStoreToProps = (state) => {
  return {
    documents: state.documentReducer.documents,
    users: state.userReducer.users,
    roles: state.roleReducer.roles
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionsDoc: bindActionCreators(AllDocActions, dispatch),
    actionsUser: bindActionCreators(UserActions, dispatch),
    actionsRole: bindActionCreators(RoleActions, dispatch),
    actionEditUser: bindActionCreators(editUserActions, dispatch)
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard);
