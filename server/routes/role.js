const express = require('express');

const router = express.Router();

const rolesController = require('../controllers/role');

const auth = require('../middleware/authentication');

/**
 * @swagger
 * definitions:
 *   NewRole:
 *     type: object
 *     required:
 *       - title
 *     properties:
 *       title:
 *         type: string
 *         example: Regular
 *   Role:
 *     allOf:
 *       - $ref: '#/definitions/NewRole'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 *
 */
router.route('/roles')
/**
     * @swagger
     * /roles:
     *   post:
     *     description: Creates a role
     *     tags:
     *      - Create Role
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: Role object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewRole'
     *     responses:
     *       200:
     *         description: roles
     *         schema:
     *          type: object,
     *          items:
     *            $ref: '#/definitions/Role'
     */
  .post(auth.verifyToken, auth.adminAccess, rolesController.createRoles)
/** @swagger
      *  /roles:
      *   get:
      *     description: Returns roles
      *     tags:
      *       - Get roles
      *     produces:
      *        - application/json
      *     parameters:
      *        - name: Authorization
      *          in: header
      *          description: an authorization header
      *          required: true
      *          type: string
      *     responses:
      *        200:
      *          description: get roles from the database
      *          schema:
      *            type: array
      *            items:
      *              $ref: '#/definitions/Role'
      */
  .get(auth.verifyToken, auth.adminAccess, rolesController.getRoles);

router.route('/roles/:id')
/** @swagger
      *  /roles/:id:
      *   get:
      *     description: Returns a role
      *     tags:
      *       - Get single role
      *     produces:
      *        - application/json
      *     parameters:
      *        - name: Authorization
      *          in: header
      *          description: an authorization header
      *          required: true
      *          type: string
      *     responses:
      *        200:
      *          description: get roles from the database
      *          schema:
      *            type: array
      *            items:
      *              $ref: '#/definitions/Role'
      */
  .get(auth.verifyToken, auth.adminAccess, rolesController.getRole)
/**
     * @swagger
     * /roles/:id:
     *   put:
     *     description: Update  a role
     *     tags:
     *      - Update a Role
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in: header
     *         description: an authorization header
     *         required: true
     *         type: string
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewRole'
     *     responses:
     *       200:
     *         description: roles
     *         schema:
     *          type: object,
     *          items:
     *            $ref: '#/definitions/Role'
     */
  .put(auth.verifyToken, auth.adminAccess, rolesController.updateRole)
   /**
     * @swagger
     * /roles/1:
     *    delete:
     *      description: Deletes the role with the id of 1
     *      tags:
     *        - Delete role
     *      produces:
     *        - application/json
     *      parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
     *      responses:
     *        200:
     *          description: roles
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/Role'
     */
  .delete(auth.verifyToken, auth.adminAccess, rolesController.deleteRole);

module.exports = () => router;
