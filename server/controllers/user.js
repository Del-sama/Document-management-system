const jwt = require('jsonwebtoken');
const model = require('../models');

const secret = 'secret';

const formattedUser = (user) => {
  const userDetails = {
    id: user.id,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    RoleId: user.RoleId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
  return userDetails;
};

/**
 * Class UsersController
 * To handle routing logic for documents route
 */
class UsersController {
  /**
   * Method getUsers to obtain all users
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {Object} response object
   */
  static getUsers(request, response) {
    model.User.findAll({
      attributes: [
        'id',
        'userName',
        'firstName',
        'lastName',
        'email',
        'RoleId',
        'createdAt',
        'updatedAt'
      ]
    }).then(users => response.status(200)
        .send(users));
  }
   /**
   * Method createUser to create a user
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {Object} - response object
   */
  static createUser(request, response) {
    model.User.findOne({ where: { userName: request.body.userName } })
     .then((user) => {
       if (user) {
         return response.status(409)
         .send({ message: `${request.body.userName} is already in use` });
       }
       model.User.create(request.body)
          .then((newUser) => {
            const token = jwt.sign({
              UserId: newUser.id,
              RoleId: newUser.RoleId
            }, secret, { expiresIn: '2 days' });
            newUser = formattedUser(newUser);
            return response.status(201)
            .send({ newUser, token, expiresIn: '2 days' });
          })
          .catch(error => response.status(400)
            .send(error.errors));
     });
  }
  /**
   * Method getUsers to obtain all users
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {Object} response object
   */
  static getUser(request, response) {
    model.User.findById(request.params.id)
      .then((user) => {
        if (!user) {
          return response.status(404)
          .send({ message: `user with id ${request.params.id} not found` });
        }
        user = formattedUser(user);
        return response.send(user);
      });
  }
  /**
   * Method updateUser
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} - response object
   */
  static updateUser(request, response) {
    model.User.findById(request.params.id)
      .then((user) => {
        if (!user) {
          return response.status(404)
          .send({ message: `No user with id: ${request.params.id}` });
        }

        user.update(request.body)
          .then((updatedUser) => {
            updatedUser = formattedUser(updatedUser);
            return response.status(200)
              .send(updatedUser);
          });
      });
  }
  /**
   * Method login
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} - response object
   */
  static login(request, response) {
    model.User.findOne({ where: { email: request.body.email } })
      .then((user) => {
        if (user && user.validPassword(request.body.password)) {
          const token = jwt.sign({
            UserId: user.id,
            RoleId: user.RoleId
          }, secret, { expiresIn: '2 days' });
          return response.status(200)
            .send({ token, expiresIn: '2 days' });
        }
        return response.status(401)
          .send({ message: 'Log in Failed' });
      });
  }
}

module.exports = UsersController;
