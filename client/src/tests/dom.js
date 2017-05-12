/* dom.js */
import { jsdom } from 'jsdom'; //eslint-disable-line

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

// mock calls to localStorage
global.window.localStorage = {
  getItem: () => {
    return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjIsIlJvbGVJZCI6MSwidXNlciI6ImFkbWluIiwiaWF0IjoxNDkyODkxNzEzLCJleHAiOjE0OTI5NzgxMTN9.bJ5OMykjtl1xwEwBYK7EJ07qcF95Oi6isIO0PdBwYEQ`;
  },
  setItem: () => {
    // do nothing
  },
  clear: () => {
    // do nothing
  }
};