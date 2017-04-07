const express = require('express');

const router = express.Router();

const usersController = require('../controllers/user');

const auth = require('../middleware/authentication');

router.route('/users')
  .get(auth.verifyToken, auth.adminAccess, usersController.getUsers)
  .post(usersController.createUser);

router.route('/users/:id')
  .get(auth.verifyToken, usersController.getUser)
  .put(auth.verifyToken, usersController.updateUser)
  .delete(auth.verifyToken, usersController.deleteUser);

router.route('/users/login')
  .post(usersController.login);

router.route('/users/logout')
  .post(usersController.logout);

module.exports = () => router;
