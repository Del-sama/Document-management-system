const express = require('express');

const router = express.Router();

const rolesController = require('../controllers/role');

const auth = require('../middleware/authentication');

router.route('/roles')
  .post(auth.verifyToken, auth.adminAccess, rolesController.createRoles)
  .get(auth.verifyToken, auth.adminAccess, rolesController.getRoles);

router.route('/roles/:id')
  .get(auth.verifyToken, auth.adminAccess, rolesController.getRole)
  .put(auth.verifyToken, auth.adminAccess, rolesController.updateRole);

module.exports = () => router;
