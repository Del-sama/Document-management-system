module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    published_date: DataTypes.DATE,
    access: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        Document.belongsTo(models.User);
      }
    }
  });
  return Document;
};
