module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      defaultValue: 'regular',
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        // isIn: [['admin', 'regular']]
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        Role.hasMany(models.User);
      }
    }
  });
  return Role;
};
