const model = require('../models');

/**
 * Class DocumentsController
 * To handle routing logic for documents route
 */
class DocumentsController {
/**
 * Method createDocuments to create new documents
 * @param {object} request - request object
 * @param {object} response - response object
 * @returns {object} response object
 * @memberOf DocumentsController
 */
  static createDocuments(request, response) {
    return model.Document.create(request.body)
      .then(newDocument => {
        const document = newDocument.dataValues;

        model.User.findById(document.userId)
        .then((user) => {
         const userData = {
            'userName': user.dataValues.userName,
            'roleId': user.dataValues.roleId
          }
          response.status(201).send(Object.assign(document, {'User': userData}))
        });

      })
      .catch(error => response.status(500)
          .send(error.message));
  }

/**
 * Method getDocuments to obtain all documents
 * @param {object} request - request object
 * @param {object} response - response object
 * @returns {object} - response object
 * @memberOf DocumentsController
 */
  static getDocuments(request, response) {
    const limit = request.query.limit || '10';
    const offset = request.query.offset || '0';
    if (request.query.limit < 0 || request.query.offset < 0) {
      return response.status(400)
      .send({ message: 'Only Positive integers are permitted.' });
    }
    const query = {
      where: {
        $or: [
          { userId: request.decoded.userId },
          { access: 'public' },
            {
              $and: [
              { access: 'role' },
              { '$User.roleId$': request.decoded.roleId }
              ]
            }
        ]
      },
      include: [{
        model: model.User,
        attributes: [
            'userName', 'roleId'
          ]
      }],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    };

    model.Document.findAndCountAll(query)
      .then((documents) => {
        const pagination = limit && offset ? {
          totalCount: documents.count,
          pages: Math.ceil(documents.count / limit),
          currentPage: Math.floor(offset / limit) + 1,
          pageSize: documents.rows.length
        } : null;
        return response.status(200).send({
          documents: documents.rows, pagination
        });
      })
      .catch(error => response.status(400).send({ message: error.message }));
    }

  /**
   * Method getDocument to obtain a document
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} - reponse object
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
          if (document.userId === request.decoded.userId) {
            response.status(200)
              .send(document);
          } else {
            response.status(403)
              .send({ message: 'You are not authorized to access this document' });
          }
          break;
        case 'role' :
          model.User.findById(document.userId)
            .then((documentOwner) => {
              if (documentOwner.roleId === request.decoded.roleId) {
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
 * Method getUserDocuments to obtain all documents created by a particular user
 * @param {object} request - request object
 * @param {object} response - response object
 * @returns {object} - response object
 * @memberOf DocumentsController
 */
  static getUserDocuments(request, response) {
    model.Document.findAll({ where: { userId: request.params.id } })
      .then((documents) => {
        if (!documents) {
          return response.status(404)
            .send({ message: `User with id ${request.params.id} has no documents` });
        } else if (documents.access === 'public' || documents.userId === request.decoded.id) {
          return response.status(200)
          .send(documents);
        }
        response.status(403)
          .send({ message: 'You are not authoried to access these documents' });
      });
  }

/**
 * Method updateDocument to edit a document
 * @param {Object} request - request Object
 * @param {Object} response - request Object
 * @return {Object} response Object
 */
  static updateDocument(request, response) {
    model.Document.findById(request.params.id)
      .then((document) => {
        if (!document) {
          return response.status(404)
          .send({ message: `No document found with id: ${request.params.id}` });
        }
        if (document.userId === request.decoded.userId) {
          document.update(request.body)
            .then(updatedDocument => response.status(200)
                .send(updatedDocument));
        } else {
          return response.status(403)
            .send({ message: 'You are not the Owner of this document.' });
        }
      });
  }

/**
 * Method deleteDocument to delete a document
 * @param {Object} request - request Object
 * @param {Object} response - request Object
 * @return {Object} response Object
 */
  static deleteDocument(request, response) {
    model.Document.findById(request.params.id)
      .then((document) => {
        if (!document) {
          return response.status(404)
          .send({ message: `No document with this id ${request.params.id}` });
        }
        if (document.userId === request.decoded.userId) {
          document.destroy()
            .then(() => response.status(200)
                .send({ message: 'Document successfully deleted' }));
        } else {
          return response.status(403)
            .send({ message: 'You are not the Owner of this document.' });
        }
      });
  }
/**
 * Method searchDocuments to search for documents
 * @param {Object} request - request Object
 * @param {Object} response - request Object
 * @return {Object} response Object
 */
  static searchDocuments(request, response) {
    if (request.query.limit < 0 || request.query.offset < 0) {
      return response.status(400)
      .send({ message: 'Only Positive integers are permitted.' });
    }
    const q = request.query.q;
    const role = Math.abs(request.query.role, 10);
    const publishedDate = request.query.publishedDate;
    const order = /^ASC$/i.test(publishedDate)
            ? publishedDate : 'DESC';

    const query = {
      where: {
        $and: [{ $or: [
          { access: 'public' },
          { userId: request.decoded.id }
        ] }],
      },
      limit: request.query.limit || null,
      offset: request.query.offset || null,
      order: [['createdAt', order]]
    };

    if (q) {
      query.where.$and.push({ $or: [
        { title: { $iLike: `%${q}%` } },
        { content: { $iLike: `%${q}%` } }
      ] });
    }

    if (role) {
      query.include = [{
        model: model.User,
        as: 'User',
        attributes: [
          'userName', 'roleId'
        ],
        include: [{
          model: model.Role,
          attributes: [],
          where: { id: role }
        }]
      }];
    }

    model.Document.findAll(query)
      .then((documents) => {
        response.send(documents);
      });
  }
}
module.exports = DocumentsController;
