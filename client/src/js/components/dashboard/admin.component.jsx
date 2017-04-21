import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import Navbar from '../Nav.component';
import Searchbar from '../searchbar.component';

class Dashboard extends Component {
  render() {
      return (
        <div>
          <div className="mainContainer">
            <div className="bg"></div>
            <Navbar />
            <Searchbar />
            <div className="row">
              <div className="tabRow">
                <ul className="tabs">
                  <li className="tab col s3"><Link to="#test3" className="active">All Docs</Link></li>
                  <li className="tab col s3"><Link to="#test1">Private Docs</Link></li>
                  <li className="tab col s3"><Link to="#test2">Public Docs</Link></li>
                  <li className="tab col s3"><Link to="#test4">Role Docs</Link></li>
                </ul>
              </div>
              <div id="test3" className="tabContent col s12">All Docs</div>
              <div id="test1" className="tabContent col s12">Private Docs</div>
              <div id="test2" className="tabContent col s12">Public Docs</div>
              <div id="test4" className="tabContent col s12">Role Docs</div>
            </div>
            <div></div>
          </div>
        </div>
      );
    }
}

export default Dashboard;
