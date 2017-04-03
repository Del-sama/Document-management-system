const express = require('express');

const router = express.Router();

const usersController = require('../controllers/user');

router.route('/users')
  .post(usersController.createUser);

module.exports = () => router;
