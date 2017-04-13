import React, { Component } from 'react';
import Navbar from './Nav.component';
import Body from './body.component';

class Index extends Component {
  /**
   * renders the index component
   * @returns {void}
   * @memberOf Index
   */
  render() {
    return (
      <div>
        <Navbar isLoginActive="active" isSignupActive="" />
       <Body />
      </div>
    );
  }
}
export default Index;