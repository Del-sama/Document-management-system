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
}

module.exports = UsersController;
