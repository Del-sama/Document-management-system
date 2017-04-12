import React, { Component } from 'react';
import { Route } from 'react-router'
import { Router, Switch, BrowserRouter } from 'react-router-dom'
import Index from './index.component';
import Signup from './containers/SignupPage.jsx';
import Login from './containers/LoginPage.jsx';

class App extends Component{
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    {/*<Route exact path='/' component={Login} />*/}
                    <Route path='/app' component={Index} />
                    <Route exact path='/' component={Signup} />
                </Switch>
            </BrowserRouter>
        );
    }
}
export default App;

