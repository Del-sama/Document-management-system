module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Role', [
      {
        id: 1,
        title: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 2,
        title: 'regular',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Role',
       { title: ['regular', 'admin'] }
    );
  }
};
