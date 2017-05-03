import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import Navbar from '../nav.component';
import Searchbar from '../searchbar.component';
import AllDocs from '../docs/allDocs.component';
import Users from '../allUsers.component';
import Roles from '../allRoles.component';

import deleteUserAction from '../../actions/userManagement/deleteUser';


class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: props.documents || [],
      users: props.users || [],
      roles: props.roles || [],
    };
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
    $('ul.tabs').tabs();
  }

  render() {
    return (
      <div>
        <div className="mainContainer">
          <div className="bg"></div>
          <Navbar />
          <Searchbar />
          <div className="row">
            <div className="tabRow">
              <ul className="tabs tabs-fixed-width">
                <li className="tab"><Link to="#test1" className="active">All Docs</Link></li>
                <li className="tab"><Link to="#test2">Users</Link></li>
                <li className="tab"><Link to="#test3">Roles</Link></li>
              </ul>
            </div>

            <div id="test1" className="tabContent col s12">
              <AllDocs documents={this.state.documents} />
            </div>
            <div id="test2" className="tabContent col s12">
              <Users users={this.state.users} deleteUser={this.props.deleteUser}/>
            </div>
            <div id="test3" className="tabContent col s12">
              <Roles roles={this.state.roles} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    viewUser: (usertoken, userId) => dispatch(viewUserAction(usertoken, userId)),
    updateUser: (userDetails, userId) =>
    dispatch(editUserAction(usertoken, userDetails, userId)),
    deleteUser: (userId) => dispatch(deleteUserAction(userId))
  };
}

export default connect(null,mapDispatchToProps)(AdminDashboard);

