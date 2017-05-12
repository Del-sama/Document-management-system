import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Index from './index.component';
import Login from './login.component';
import Signup from './signup.component';
import NotFound from './notfound.component';
import Dashboard from './dashboard/Index.component';
import ViewUser from './users/viewUser.component';
import EditUser from './users/editUser.component';
import EditUsersRole from './users/editUsersRole.component';


/**
 *
 *
 * @class App creates different component routes
 * @extends {Component}
 */
class App extends Component {

/**
 * renders the app component
 * @returns {void}
 * @memberOf App
 */
  render() {
    return (
      <Router history={browserHistory}>
          <Route path='/app/' component={Index} />
          <Route path='/app/login' component={Login} />
          <Route  path='/app/signup' component={Signup} />
          <Route  path='/app/dashboard' component={Dashboard} />
          <Route  path='/app/profile' component={ViewUser} />
          <Route  path='/app/profile/edit' component={EditUser} />
          <Route  path='/app/user/role-edit' component={EditUsersRole} />
          <Route  path='/*' component={NotFound} />
      </Router>
    );
  }
}

export default App;
