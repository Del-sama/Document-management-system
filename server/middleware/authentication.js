const jwt = require('jsonwebtoken');
const model = require('../models');

const secret = 'secret';

const Auth = {
  verifyToken(request, response, next) {
    let token = request.headers.authorization ||
      request.body.token || request.headers['x-access-token'];
    if (!token) {
      return response.status(401)
      .send({ message: 'No token supplied' });
    }
    jwt.verify(token, secret, (err, decoded)=>{
      console.log(token, err, decoded, 'token');
    });

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return response.status(401)
            .send({ message: 'Token Invalid' });
      }
      request.decoded = decoded;
      return next();
    });
  },
  adminAccess(request, response, next) {
    model.Role.findById(request.decoded.roleId)
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
