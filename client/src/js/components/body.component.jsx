import React, { Component } from 'react';
import Login from './login.component';
import { Row, Col, Input, Button } from 'react-materialize';
import { browserHistory, Link } from 'react-router';


/**
 *
 *
 * @class Body the home page of the application
 * @extends {Component}
 */
class Body extends Component {
  render() {
    if (window.localStorage.getItem('token')) {
      return (
        <div>
          <div className="bodyInnards">
            <Row>
              <Col m={12}>
                <i className="material-icons">library_books</i>
                <h4>Your Document Management System <br /><em>...A safe place for all your files</em></h4>
                <Link to="/app/dashboard" className="waves-effect waves-light btn-large">Go To Dashboard</Link>
              </Col>
            </Row>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="bodyInnards">
          <Row>
            <Col m={12}>
              <i className="material-icons">library_books</i>
              <h4>Your Document Management System <br /><em>...A safe place for all your files</em></h4>
              <Link to="/app/signup" className="waves-effect waves-light btn-large">Get Started</Link>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Body;