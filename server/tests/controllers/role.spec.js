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
        const newRole = { title: 'super admin' };
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
      it('should not create another regular role', (done) => {
        const newRole = { };
        request.post('/roles')
          .set({ Authorization: token })
          .send(newRole)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body[0].message).to.equal('title must be unique');
            done();
          });
      });
      it('should not create a role with null title', (done) => {
        const newRole = { title: null };
        request.post('/roles')
          .set({ Authorization: token })
          .send(newRole)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body[0].message).to.equal('title cannot be null');
            done();
          });
      });
    });
    describe('GET: (/roles)', () => {
      it('should not return roles where no token is provided', (done) => {
        request.get('/roles')
          .expect(401, done);
      });
      it('should not return roles where token is invalid', (done) => {
        request.get('/roles')
          .set({ Authorization: 'jbugubhbhkbkbkb' })
          .expect(401, done);
      });
      it('should return roles where token is valid', (done) => {
        request.get('/roles')
          .set({ Authorization: token })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            // eslint-disable-next-line no-unused-expressions
            expect(Array.isArray(response.body)).to.be.true;
            expect(response.body.length).to.be.greaterThan(0);
            done();
          });
      });
    });
    describe('GET: (/roles/:id) - GET ROLE', () => {
      it('should not return the role when supplied invalid id', (done) => {
        request.get('/roles/999999')
          .set({ Authorization: token })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            done();
          });
      });
      it('should return the role when valid id is provided', (done) => {
        request.get(`/roles/${role.id}`)
          .set({ Authorization: token })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
      });
    });
  });
});

