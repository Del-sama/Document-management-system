module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    type: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Role.hasMany(models.User);
      }
    }
  });
  return Role;
};
