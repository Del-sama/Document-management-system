const express = require('express');

const router = express.Router();

const documentsController = require('../controllers/document');

const auth = require('../middleware/authentication');

router.route('/search/documents')
  .get(auth.verifyToken, documentsController.searchDocuments);

module.exports = () => router;
