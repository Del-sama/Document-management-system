const app = require('../../server');
const request = require('supertest')(app);
const expect = require('chai').expect;
const model = require('../../models');
const helper = require('../specHelper');

const adminRoleParam = helper.testRole;
const regularRoleParam = helper.testRole2;
const userParam = helper.testUser;

describe('Role API', () => {
  let token;
  let role;

  before((done) => {
    model.Role.create(adminRoleParam)
      .then((adminRole) => {
        userParam.RoleId = adminRole.id;
        request.post('/users')
          .send(userParam)
          .end((error, response) => {
            token = response.body.token;
            expect(response.status).to.equal(201);
            done();
          });
      });
  });

   beforeEach((done) => {
    model.Role.create(regularRoleParam)
      .then((regularRole) => {
        role = regularRole;
        done();
      });
  });

  afterEach(() => model.Role.destroy({ where: { id: role.id } }));

  after(() => model.sequelize.sync({ force: true }));

 describe('REQUESTS', () => {
    describe('POST: (/roles) - CREATE ROLE', () => {
      it('should create a role when required field is valid', (done) => {
        const newRole = { title: 'super duper Admin' };
        request.post('/roles')
          .set({ Authorization: token })
          .send(newRole)
          .end((error, response) => {
            expect(response.status).to.equal(201);
            expect(response.body.title).to.equal(newRole.title);
            done();
          });
      });
      it('should not create a role when required field is invalid', (done) => {
        const newRole = { name: 'guest' };
        request.post('/roles')
          .set({ Authorization: token })
          .send(newRole)
          .expect(400, done);
      });
    });
 });
});

