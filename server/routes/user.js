import express from 'express';
import usersController from '../controllers/user';
import auth from '../middleware/authentication';

const router = express.Router();

router.route('/users')
  .get(auth.verifyToken, auth.adminAccess, usersController.getUsers)
  .post(usersController.createUser);

router.route('/users/:id')
  .get(auth.verifyToken, usersController.getUser)
  .put(auth.verifyToken, usersController.updateUser);

router.route('/users/login')
  .post(usersController.login);

router.route('/users/logout')
  .post(usersController.logout);

module.exports = () => router;
