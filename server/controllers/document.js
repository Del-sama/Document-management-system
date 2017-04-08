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
   * @static
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} response object
   * @memberOf DocumentsController
   */
  static createDocuments(request, response) {
    model.Documents.create(request.body)
      .then(newDocument => response.status(201)
          .send(newDocument))
      .catch(error => response.status(400)
          .send(error.errors));
  }
}
module.exports = DocumentsController;
