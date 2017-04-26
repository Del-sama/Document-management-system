const express = require('express');

const router = express.Router();

const documentsController = require('../controllers/document');

const usersController = require('../controllers/user');

const auth = require('../middleware/authentication');

router.route('/search/documents')
  .get(auth.verifyToken, documentsController.searchDocuments);

router.route('/search/users')
  .get(auth.verifyToken, usersController.searchUsers);

module.exports = () => router;
