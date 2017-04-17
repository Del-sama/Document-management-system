import React, { Component } from 'react';
import Login from './login.component';
import Signup from './signup.component';

class Body extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s6 main-image">
            <img src="../../images/files.jpeg" />
          </div>
          <div className="col s6 user-auth">
            <Login />
          </div>
        </div>
       </div>
    );
  }
}
export default Body;