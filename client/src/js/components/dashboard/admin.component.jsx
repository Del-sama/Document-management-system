import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import Navbar from '../nav.component';
import Searchbar from '../searchbar.component';
import AllDocs from '../docs/allDocs.component';
import Users from '../allUsers.component';
import Roles from '../allRoles.component';


class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
              <AllDocs document={this.props.documents} />
            </div>
            <div id="test2" className="tabContent col s12">
              <Users users={this.props.users} />
            </div>
            <div id="test3" className="tabContent col s12">
              <Roles roles={this.props.roles} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;

