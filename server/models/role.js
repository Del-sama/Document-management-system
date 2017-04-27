module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      defaultValue: 'regular',
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        Role.hasMany(models.User, {
          foreignKey: 'RoleId'
        });
      }
    },
    freezeTableName: true
  });
  return Role;
};
