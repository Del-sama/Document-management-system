import express from 'express';
import usersController from '../controllers/user';
import auth from '../middleware/authentication';

const router = express.Router();

router.route('/users')
  .get(auth.verifyToken, auth.adminAccess, usersController.getUsers)
  .post(usersController.createUser);

module.exports = () => router;
