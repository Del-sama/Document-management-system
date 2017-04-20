const ReactDom = require('react-dom');
const React = require('react');
const sass = require('../scss/main.scss');
import App from './components/app.component'

ReactDom.render(<App />, document.getElementById('react-app'));
