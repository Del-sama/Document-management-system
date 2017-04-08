const model = require('../models');


const accessCategories = {
  public: 'public',
  private: 'private',
  role: 'role'
};

/**
 * Class DocumentsController
 * To handle routing logic for documents route
 */
class DocumentsController {


/**
 * static getDocuments
 * @param {object} request - request object
 * @param {object} response - response object
 * @returns {object} - response object
 * @memberOf DocumentsController
 */
  static getDocuments(request, response) {
    if (request.query.limit < 0 || request.query.offset < 0) {
      return response.status(400)
      .send({ message: 'Only Positive integers are permitted.' });
    }
    const query = {
      where: {
        $or: [
          { access: 'public' },
          { UserId: request.decoded.UserId }
        ]
      },
      limit: request.query.limit || null,
      offset: request.query.offset || null,
      order: [['createdAt', 'DESC']]
    };

    model.Document.findAll(query)
      .then(documents => response.status(200)
          .send(documents));
  }
  /**
   * static
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} response object
   * @memberOf DocumentsController
   */
  static createDocuments(request, response) {
    model.Document.create(request.body)
      .then(newDocument => response.status(201)
          .send(newDocument))
      .catch(error => response.status(500)
          .send(error.errors));
  }
}
module.exports = DocumentsController;
