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
    it('should get all users when provided valid token & access', (done) => {
      request.get('/users')
        .set({ Authorization: token })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          // eslint-disable-next-line no-unused-expressions
          expect(Array.isArray(response.body)).to.be.true;
          expect(response.body.length).to.be.greaterThan(0);
          done();
        });
    }); describe('GET: (/users/:id) - GET A USER', () => {
      it('should not return a user id is invalid', (done) => {
        request.get('/users/9999')
        .set({ Authorization: token })
        .expect(404, done);
      });
      it('should return the user with supplied id', (done) => {
        request.get(`/users/${user.id}`)
        .set({ Authorization: token })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(user.userName).to.equal(userParams.userName);
          done();
        });
      });
    });
  });
});

