const jwt = require('jsonwebtoken');
const model = require('../models');

const secret = 'secret';

const formatUser = (user) => {
  const userDetails = {
    id: user.id,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    roleId: user.roleId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
  return userDetails;
};

/**
 * Class UsersController
 * To handle routing logic for users route
 */
class UsersController {
/**
 * Method getUsers to obtain all users
 * @param {object} request - request object
 * @param {object} response - response object
 * @returns {Object} response object
 */
  static getUsers(request, response) {
    const limit = request.query.limit || '10';
    const offset = request.query.offset || '0';
    if (request.query.limit < 0 || request.query.offset < 0) {
      return response.status(400)
      .send({ message: 'Only Positive integers are permitted.' });
    }
    model.User.findAndCountAll({
      attributes: [
        'id',
        'userName',
        'firstName',
        'lastName',
        'email',
        'roleId',
        'createdAt',
        'updatedAt'
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    }).then((users) => {
        const pagination = {
          totalCount: users.count,
          pages: Math.ceil(users.count / limit),
          currentPage: Math.floor(offset / limit) + 1,
          pageSize: users.rows.length
        };
        return response.status(200).send({
          users: users.rows,
          pagination
        });
        })
        .catch(error => response.status(400).send({
          Error: error.message
        }));
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
          .then((user) => {
            const token = jwt.sign({
              userId: user.id,
              roleId: user.roleId,
              userName: user.userName
            }, secret, { expiresIn: '2 days' });
            user = formatUser(user);
            return response.status(201)
            .send({ user, token, expiresIn: '2 days' });
          })
          .catch(error => response.status(400)
            .send(error.message));
     });
  }

/**
 * Method getUser to obtain a user
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
        user = formatUser(user);
        return response.send(user);
      });
  }

/**
 * Method updateUser to update user details
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
            updatedUser = formatUser(updatedUser);
            return response.status(200)
              .send(updatedUser);
          });
      });
  }

/**
 * Method deleteUser to delete a user from the database
 * @param {object} request - request object
 * @param {object} response - response object
 * @returns {object} - response object
 */
  static deleteUser(request, response) {
    model.Role.findById(request.decoded.roleId)
      .then((Role) => {
        if ((request.decoded.userId !== parseInt(request.params.id, 10)) &&Role.title.toLowerCase() !== 'admin') {
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
 * Method login to login created users
 * @param {object} request
 * @param {object} response
 * @returns {object} response object
 * @memberOf UsersController
 */
  static login(request, response) {
    // if (request.body.userName && request.body.password) {
      model.User.findOne({ where: { userName: request.body.userName } })
        .then((user) => {
          if (user && user.validPassword(request.body.password)) {
            const payload = {
              userId: user.id,
              roleId: user.roleId,
              userName: user.userName
            };
            const token = jwt.sign(payload, secret, { expiresIn: '2 days' });
            return response.status(200)
              .send({ token, expiresIn: '2 days' });
          }
          return response.status(401)
            .send({ message: 'Login Failed' });
        })
    }

/**
 * Method logout to logout logged in users
 * @param {object} request - request object
 * @param {object} response - response object
 * @returns {object} - response object
 */
  static logout(request, response) {
    return response.status(200)
      .send({ message: 'Successful logout' });
  }

/**
 * Method searchUsers to search for users using query strings
 * @param {object} request - request object
 * @param {object} response - response object
 * @returns {object} - response object
 */
  static searchUsers(request, response) {
  if (request.query.limit < 0 || request.query.offset < 0) {
      return response.status(400)
      .send({ message: 'Only Positive integers are permitted.' });
    }
    const q = request.query.q;

    const query = {
      where: {
        $or: [
          {firstName: { $iLike: `%${q}%`}},
          {userName: {$iLike: `%${q}%`}}
        ]
      },
      limit: request.query.limit || null,
      offset: request.query.offset || null,
      order: [['id', 'ASC']]
    };
    model.User.findAll(query)
      .then((users) => {
        response.send(users);
      });
  }
  /**
 * Method changePassword to update the password of a user
 * @param {object} request - request object
 * @param {object} response - response object
 * @returns {object} - response object
 */
  // static changePassword(request, response) {
  //   if (req.decoded) {
  //     User.find({
  //       where: {
  //         id: req.params.id
  //       }
  //     })
  //       .then((user) => {
  //         if (user) {
  //           bcrypt.compare(req.body.oldPassword, user.password_digest, (err, same) => {
  //             if (err) {
  //               res.status(500).json({ error: err.message });
  //             }
  //             if (req.body.password && req.body.password_confirmation) {
  //               user.password = req.body.password;
  //               user.password_confirmation = req.body.password_confirmation;
  //             }
  //             user.save()
  //             .then(() => {
  //               return res.status(200).json(req.body);
  //             })
  //             .catch((err) => {
  //               res.status(500).json({ error: err.message });
  //             });
  //           });
  //         }
  //       });
  //   }
  // },
}

module.exports = UsersController;
