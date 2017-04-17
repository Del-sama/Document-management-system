import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Index from './index.component';
import Login from './login.component';
import Signup from './signup.component';

class App extends Component {
  /**
   * renders the app component
   * @returns {void}
   * @memberOf App
   */
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Index} />
          <Route  path='/app/login' component={Login} />
          <Route  path='/app/signup' component={Signup} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
