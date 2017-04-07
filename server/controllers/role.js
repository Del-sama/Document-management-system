const model = require('../models');

/**
 * Class UsersController
 * To handle routing logic for documents route
 */
class RolesController {

/**
   * Method getUsers to obtain all users
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {Object} response object
   */
  static createRoles(request, response) {
    model.Role.create(request.body)
      .then(newRole => response.status(201)
          .send(newRole))
      .catch(error => response.status(400)
        .send(error.errors));
  }
}

module.exports = RolesController;
