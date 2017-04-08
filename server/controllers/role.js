const model = require('../models');

/**
 * Class UsersController
 * To handle routing logic for documents route
 */
class RolesController {

/**
 * Method getRoles to obtain all roles
 * @param {Object} request - request Object
 * @param {Object} response - request Object
 * @return {Object} response Object
 */
  static getRoles(request, response) {
    model.Role.findAll()
    .then(Roles => response.status(200)
    .send(Roles));
  }

/**
   * Method createRoles to obtain all users
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
  /**
   * Method getRole to obtain all users
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {Object} response object
   */
  static getRole(request, response) {
    model.Role.findById(request.params.id)
      .then((role) => {
        if (!role) {
          return response.status(404)
            .send({ message: `Role with id ${request.params.id} not found` });
        }
        return response.status(200)
          .send(role);
      });
  }
  /**
   * Method updateUser
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} - response object
   */
  static updateRole(request, response) {
    model.Role.findById(request.params.id)
      .then((role) => {
        if (!role) {
          return response.status(404)
            .send({ message: `Role with id ${request.params.id} not found` });
        }
        role.update(request.body)
          .then((updateRole) => {
            response.status(200)
              .send(updateRole);
          });
      });
  }
  /**
   * Method deleteRole
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response object
   */
  static deleteRole(request, response) {
    model.Role.findById(request.params.id)
      .then((role) => {
        if (!role) {
          return response.status(404)
            .send({ message: `Role with id ${request.params.id} not found` });
        }
        role.destroy()
          .then(() => response.status(200)
            .send({ message: 'Successfully deleted role' }));
      });
  }
}

module.exports = RolesController;
