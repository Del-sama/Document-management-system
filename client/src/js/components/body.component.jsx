import React, { Component } from 'react';
import Login from './login.component';
import { Row, Col, Input, Button } from 'react-materialize';
import { browserHistory, Link } from 'react-router';

class Body extends Component {
  render() {
    return (
      <div>
        <div className="bodyInnards">
          <Row>
            <Col m={12}>
              <i className="material-icons">library_books</i>
              <h4>Your Document Management System <br/><em>...A safe place for all your files</em></h4>
              <Link to="/app/signup" className="waves-effect waves-light btn-large">Get Started</Link>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Body;