'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsTo(models.Role);
        User.hasMany(models.Document);
      }
    }
  });
  return User;
};