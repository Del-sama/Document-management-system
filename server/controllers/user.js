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
    if (request.query.limit < 0 || request.query.offset < 0) {
      return response.status(400)
      .send({ message: 'Only Positive integers are permitted.' });
    }
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
      ],
      limit: request.query.limit || null,
      offset: request.query.offset || null,
      order: [['createdAt', 'DESC']]
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
              RoleId: newUser.RoleId,
              userName: newUser.userName
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
   * Method deleteUser
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} - response object
   */
  static deleteUser(request, response) {
    model.Role.findById(request.decoded.RoleId).then((Role) => {
      if (request.decoded.UserId !== request.params.id && Role.title.toLowerCase() !== 'admin') {
        return response.status(403).send({ message: 'User is unauthorized for this request' });
      }
      model.User.findById(request.params.id)
          .then((user) => {
            if (!user) {
              return response.status(404)
              .send({ message: `No user with id: ${request.params.id}` });
            }
            return user.destroy()
              .then(() => response.status(200)
                .send({ message: 'User was successfully deleted' }));
          });
    });
  }
  /**
   *
   * @static
   * @param {any} request
   * @param {any} response
   * @returns {object} response object
   * @memberOf UsersController
   */
  static login(request, response) {
    model.User.findOne({ where: { userName: request.body.userName } })
      .then((user) => {
        if (user && user.validPassword(request.body.password)) {
          const payload = {
            UserId: user.id,
            RoleId: user.RoleId,
            userName: user.userName
          };
          const token = jwt.sign(payload, secret, { expiresIn: '2 days' });
          return response.status(200)
            .send({ token, expiresIn: '2 days' });
        }
        return response.status(401)
          .send({ message: 'Log in Failed' });
      })
  }
   /**
   * Method logout
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} - response object
   */
  static logout(request, response) {
    return response.status(200)
      .send({ message: 'Successful logout' });
  }
  /**
   * Method searchUsers
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} - response object
   */
  static searchUsers(request, response) {
  if (request.query.limit < 0 || request.query.offset < 0) {
      return response.status(400)
      .send({ message: 'Only Positive integers are permitted.' });
    }
    const queryString = request.query.queryString;

    const query = {
      where: { userName: { $like: `%${queryString}%`} },
      limit: request.query.limit || null,
      offset: request.query.offset || null,
      order: [['id', 'ASC']]
    };
    model.User.findAll(query)
      .then((users) => {
        response.send(users);
      });
  }
}

module.exports = UsersController;
