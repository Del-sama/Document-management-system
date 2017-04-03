const model = require('../models');

class UsersController {
 static createUser(request, response) {
   model.User.findOne({ where: { userName: request.body.userName } })
     .then((user) => {
       if (!user) {
         model.User.create(request.body);
       }
       return response.status(409)
         .send({ message: `${request.body.userName} is already in use` });
     });
 }
}

module.exports = UsersController;
