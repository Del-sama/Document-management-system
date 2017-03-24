'use strict';
module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    type: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Role.hasMany(models.User);
      }
    }
  });
  return Role;
};