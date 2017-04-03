<<<<<<< HEAD
const jwt = require('jsonwebtoken');
const model = require('../models');

const UsersController  {
  static createUser {
    const newUser = (request, response) {
      model.User.findOne({where: { username: request.body.user}})
    }
  }
}
var newUser = function (req, res){
  User.findOne({where:{ username: req.body.username }})
    .then(function (user) {
      if(!user){
        User.create({ 
          username: req.body.username, 
          password: req.body.password, 
          email: req.body.email 
        })
        .then(function(user){
              var myToken = jwt.sign({ user: user.id },
                                      'secret',
                                     { expiresIn: 24 * 60 * 60 });
              res.send(200, {'token': myToken,
                             'userId':    user.id,
                             'username': user.username });
        });
      } else {
        res.status(404).json('Username already exist!');
      }
    })
    .catch(function (err) {
      res.send('Error creating user: ', err.message);
    });
};
=======
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
>>>>>>> 1931d16cdda461b4dd2534b1f95dd6bdf6a9ca05
