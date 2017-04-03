const jwt = require('jsonwebtoken');
const model = require('../models');

const Auth = {
  verifyToken(request, response, next) {
    const token = request.body.token || request.headers['x-access-token'];
    if (token) {
      jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
          return response.status(401)
            .send({ message: 'Token Invalid' });
        }
        request.decoded = decoded;
        return next();
      });
    }
    return response.status(401)
    .send({ message: 'Not authorized' });
  },
  adminAccess(request, response, next) {
    model.Role.findById(request.decoded.RoleId)
      .then((Role) => {
        if (Role.title.toLowerCase() === 'admin') {
          next();
        } else {
          return response.status(403)
            .send({ message: 'User is unauthorized for this request.' });
        }
      });
  }
};

module.exports = Auth;
