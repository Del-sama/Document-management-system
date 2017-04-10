const model = require('../models');


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
    return model.Document.create(request.body)
      .then(newDocument => response.status(201)
          .send(newDocument))
      .catch(error => response.status(500)
          .send(error));
  }

  /**
   * static
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} - response object
   * @memberOf DocumentsController
   */
  static getDocument(request, response) {
    model.Document.findById(request.params.id)
      .then((document) => {
        if (!document) {
          return response.status(404)
            .send({ message: `Doccument with id ${request.params.id} not found` });
        }
        switch (document.access) {
        case 'public' :
          response.status(200)
          .send(document);
          break;
        case 'private':
          if (document.UserId === request.decoded.UserId) {
            response.status(200)
              .send(document);
          } else {
            response.status(403)
              .send({ message: 'You are not authorized to access this document' });
          }
          break;
        case 'role' :
          model.User.findById(document.UserId)
            .then((documentOwner) => {
              if (documentOwner.RoleId === request.decoded.RoleId) {
                return response.status(200)
                  .send(document);
              }
              return response.status(403)
                .send({ message: 'You are not authorized to access this document' });
            });
          break;
        default:
          return response.status(403)
            .send({ message: 'You are not authorized to access this document' });
        }
      });
  }
 /**
   * static
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} - response object
   * @memberOf DocumentsController
   */
  static getUserDocuments(request, response) {
    model.Document.findAll({ where: { UserId: request.params.id } })
      .then((documents) => {
        if (!documents) {
          response.status(400)
            .send({ message: `User with id ${request.params.id} has no documents` });
        }
        if (documents.access === 'public' || documents.UserId === request.decoded.id) {
          return response.status(200)
          .send(documents);
        }
        return response.status(403)
          .send({ message: 'You are not authoried to access these documents' });
      });
  }
}
module.exports = DocumentsController;
