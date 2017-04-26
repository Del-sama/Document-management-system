const swaggerJSDoc = require('swagger-jsdoc');
const express = require('express');

const router = express.Router();

  // swagger definition
const swaggerDefinition = {
  info: {
    title: 'iDocMan API',
    version: '1.0.0',
    description: 'API documentation for iDocMan',
  }
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./server/routes/document.js', './server/routes/user.js', './server/routes/search.js', './server/routes/role.js', './server/routes/index.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = () => {
  router.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    res.send(swaggerSpec);
  });

  return router;
};