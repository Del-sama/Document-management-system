const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up(queryInterface) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert('User', [
      {
        id: 1,
        userName: 'Lolita',
        firstName: 'Delores',
        lastName: 'Diei',
        email: 'delores.diei@gmail.com',
        password: bcrypt.hashSync('triger'),
        RoleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userName: 'Ozzy',
        firstName: 'Ozzy',
        lastName: 'Diei',
        email: 'ozzyoswald@gmail.com',
        password: bcrypt.hashSync('triger'),
        RoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
      { returning: true, validate: true }
      );
  },

  down(queryInterface) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
  */
    return queryInterface.bulkDelete('User',
    { RoleId: [1, 2] }, { returning: true });
  }
};