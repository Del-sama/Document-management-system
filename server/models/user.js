module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        User.belongsTo(models.Role);
        User.hasMany(models.Document);
      }
    }
  });
  return User;
};
