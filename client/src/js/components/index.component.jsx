import React, { Component } from 'react';
import Navbar from './nav.component';
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
        <div className="mainContainer">
          <div className="bg"></div>
        <Navbar isLoginActive="active" isSignupActive="" />
        <Body />
        </div>
      </div>
    );
  }
}
export default Index;