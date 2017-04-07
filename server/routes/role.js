const express = require('express');

const router = express.Router();

const rolesController = require('../controllers/role');

const auth = require('../middleware/authentication');

router.route('/roles')
  .post(auth.verifyToken, auth.adminAccess, rolesController.createRole);

module.exports = () => router;
