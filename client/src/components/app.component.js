import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Index from './index.component';

class App extends Component {
  /**
   * renders the app component
   * @returns {void}
   * @memberOf App
   */
  render() {
    return (
      <BrowserRouter>
        <Route path='/app' component={Index} />
      </BrowserRouter>
    );
  }
}

export default App;

