const faker = require('faker');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  testRole: {
    title: 'admin'
  },

  testRole2: {
    title: 'regular'
  },

  testUser: {
    userName: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'deloresdiei'
  },

  testUser2: {
    userName: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  testUser3: {
    userName: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  testDocument: {
    title: faker.lorem.sentence(7),
    content: faker.lorem.paragraphs(),
    published_date: Date.now()
  },

  testDocument2: {
    title: faker.finance.accountName(),
    content: faker.lorem.paragraph(),
    access: 'private'
  },

  testDocument3: {
    title: faker.commerce.department(),
    content: faker.lorem.paragraph()
  },

  documentsCollection() {
    const documentsParams = [];

    for (let i = 0; i <= 15; i += 1) {
      documentsParams.push({
        title: faker.lorem.sentence(7),
        content: faker.lorem.paragraph(),
        OwnerId: 1
      });
    }

    return documentsParams;
  }
};
