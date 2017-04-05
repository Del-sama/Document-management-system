const express = require('express');

const router = express.Router();

const usersController = require('../controllers/user');

const auth = require('../middleware/authentication');

router.route('/users')
  .get(auth.verifyToken, auth.adminAccess, usersController.getUsers)
  .post(usersController.createUser);

module.exports = () => router;
