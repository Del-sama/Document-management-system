import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import { Link } from 'react-router';

/**
 *
 *
 * @class NotFound routes to a 404 page if page is not found
 * @extends {Component}
 */
class NotFound extends Component {
  render() {
    return (
      <div className="bodyInnards">
        <div className="row">
          <h1>404</h1>
          <p>You seem lost</p>
          <div>
            <p>
              <Link to="/app/">
                Take this route back home
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;