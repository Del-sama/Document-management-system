const path  = require('path');
const router = require('express').Router();

router.route('/')
  .get((request, response) => response
    .status(200)
    .sendFile(path.join(__dirname, '../apiDocs', 'index.html')));

module.exports = () => router;

