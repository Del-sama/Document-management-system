import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Index from './index.component';
import Login from './login.component';
import Signup from './signup.component';
import AdminDashboard from './admindashboard.component';
import Dashboard from './dashboard.component';

class App extends Component {
  /**
   * renders the app component
   * @returns {void}
   * @memberOf App
   */
  render() {
    return (
      <Router history={browserHistory}>
          <Route path='/' component={Index} />
          <Route path='/app/login' component={Login} />
          <Route  path='/app/signup' component={Signup} />
          <Route  path='/app/admindashboard' component={AdminDashboard} />
          <Route  path='/app/dashboard' component={Dashboard} />
      </Router>
    );
  }
}

export default App;
