module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    access: {
      defaultValue: 'public',
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isIn: [['private', 'public', 'role']]
      }
    },
  }, {
    classMethods: {
      associate: (models) => {
        Document.belongsTo(models.User, {
          as: 'User',
          onDelete: 'CASCADE',
          foreignKey: { allowNull: true }
        });
      }
    }
  });
  return Document;
};
