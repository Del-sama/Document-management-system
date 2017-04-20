import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { browserHistory, Link } from 'react-router';
import Navbar from './Nav.component';

class AdminDashboard extends Component {
  render() {
    return (
      <div>
        <div className="mainContainer">
          <div className="bg"></div>
        <Navbar />
        </div>
      </div>
    );
  }
}

export default AdminDashboard;