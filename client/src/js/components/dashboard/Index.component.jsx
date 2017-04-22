import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Navbar from '../Nav.component';
import Searchbar from '../searchbar.component';
import AdminDashboard from './admin.component';
import UserDashboard from './user.component';
import { bindActionCreators } from 'redux';
import * as docActions from '../../actions/documentManagement/readDocument';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    const token = window.localStorage.getItem('token');
    this.state = {
      AdminRoleId: 1,
      authUser: jwtDecode(token) || {},
    }
  }

  componentWillMount() {
    const userId = this.state.authUser.UserId || null
    this.props.actions.viewUserDocuments(userId);
  }

  render() {
    const roleId = this.state.authUser.role_id || null
    return (roleId === this.state.AdminRoleId) ?
      <AdminDashboard /> :
      <UserDashboard documents={this.props.documents} />
  }
}

const mapStoreToProps = (state) => {
  return {
    documents: state.documentReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(docActions, dispatch)
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard);
