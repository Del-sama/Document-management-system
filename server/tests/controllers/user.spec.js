const app = require('../../server');
const request = require('supertest')(app);
const expect = require('chai').expect;
const model = require('../../models');
const helper = require('../specHelper');

const userParams = helper.testUser;
const roleParams = helper.testRole;
const userParams2 = helper.testUser2;
const roleParams2 = helper.testRole2;

describe('User API', () => {
  let user1;
  let user2;
  let token1;
  let token2;
  before(() => model.Role.bulkCreate([roleParams, roleParams2], {
    returning: true })
      .then((createdRoles) => {
        userParams.RoleId = createdRoles[0].id;
        userParams2.RoleId = createdRoles[1].id;
      }));

  afterEach(() => model.User.destroy({ where: {} }));

  after(() => model.sequelize.sync({ force: true }));

  describe('REQUESTS', () => {
    beforeEach((done) => {
      request.post('/users')
        .send(userParams, userParams2)
        .end((error, response) => {
          user1 = response.body.newUser;
          token1 = response.body.token;
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
        .set({ Authorization: token1 })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          // eslint-disable-next-line no-unused-expressions
          expect(Array.isArray(response.body)).to.be.true;
          expect(response.body.length).to.be.greaterThan(0);
          done();
        });
    });
    describe('GET: (/users/:id) - GET A USER', () => {
      it('should not return a user id is invalid', (done) => {
        request.get('/users/9999')
        .set({ Authorization: token1 })
        .expect(404, done);
      });
      it('should return the user with supplied id', (done) => {
        request.get(`/users/${user1.id}`)
        .set({ Authorization: token1 })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(user1.userName).to.equal(userParams.userName);
          done();
        });
      });
    });
    describe('PUT: (/users/:id) - UPDATE', () => {
      it('should not perform update if supplied id is invalid', (done) => {
        request.get('/users/9999')
          .set({ Authorization: token1 })
          .expect(404, done);
      });
      it('should update a user if supplied id is valid', (done) => {
        const fieldsToUpdate = {
          firstName: 'Delores',
          lastName: 'Diei'
        };

        request.put(`/users/${user1.id}`)
          .set({ Authorization: token1 })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.firstName).to.equal(fieldsToUpdate.firstName);
            done();
          });
      });
    });

    describe('DELETE: (/users/:id) - DELETE A USER', () => {
      it('should not perform a delete if supplied id is invalid', (done) => {
        request.get('/users/9999')
          .set({ Authorization: token1 })
          .expect(404, done);
      });
      it('should succesfully delete a user when provided valid id', (done) => {
        request.delete(`/users/${user1.id}`)
          .set({ Authorization: token1 })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            model.User.count()
              .then((userCount) => {
                expect(userCount).to.equal(0);
                done();
              });
          });
      });
      it('should perform delete on request from admin', (done) => {
        request.delete(`/users/${user1.id}`)
        .set({ Authorization: token1 })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          done();
        });
      });
    });
  });
});

