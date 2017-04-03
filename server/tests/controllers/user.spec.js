const app = require('../../server');
const request = require('supertest')(app);
const expect = require('chai').expect;
const model = require('../../models');
const helper = require('../specHelper');

const userParams = helper.testUser;
const roleParams = helper.testRole;

describe('User API', () => {
  let user;
  let token;
  before(() => model.Role.create(roleParams)
      .then((createdRole) => {
        userParams.RoleId = createdRole.id;
      }));

  afterEach(() => model.User.destroy({ where: {} }));

  after(() => model.sequelize.sync({ force: true }));

  describe('REQUESTS', () => {
    beforeEach((done) => {
      request.post('/users')
        .send(userParams)
        .end((error, response) => {
          user = response.body.newUser;
          token = response.body.token;
          done();
        });
    });

    it('should not create another user with same user name', (done) => {
      request.post('/users')
        .send(userParams)
        .expect(409, done);
    });
  });
});
