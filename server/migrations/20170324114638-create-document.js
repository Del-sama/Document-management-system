module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Document', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING
    },
    content: {
      allowNull: false,
      type: Sequelize.TEXT
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
         model: 'User',
         key: 'id',
       },
    },
    access: {
      allowNull: false,
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Document')
};
