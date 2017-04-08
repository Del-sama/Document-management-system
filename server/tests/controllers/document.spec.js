const app = require('../../server');
const request = require('supertest')(app);
const expect = require('chai').expect;
const model = require('../../models');
const helper = require('../specHelper');

const adminRoleParams = helper.testRole;
const regularRoleParams = helper.testRole2;
const adminUserParams = helper.testUser;
const regularUserParams = helper.testUser2;
const regularUserParams2 = helper.testUser3;
const publicDocumentParams = helper.testDocument;

describe('DOCUMENT API', () => {
  let adminRole, regularRole, adminUser, privateUser, privateUser2, publicToken,
    privateToken, privateToken2, publicDocument, privateDocument, roleDocument;

  before((done) => {
    model.Role.bulkCreate([adminRoleParams, regularRoleParams], {
      returning: true })
      .then((createdRoles) => {
        adminRole = createdRoles[0];
        regularRole = createdRoles[1];
        adminUserParams.RoleId = adminRole.id;
        // Two users here are assigned same RoleId to demonstrate role access
        regularUserParams.RoleId = regularRole.id;
        regularUserParams2.RoleId = regularRole.id;

        request.post('/users')
          .send(adminUserParams)
          .end((error, response) => {
            adminUser = response.body.newUser;
            publicToken = response.body.token;

            request.post('/users')
              .send(regularUserParams)
              .end((err, res) => {
                privateUser = res.body.newUser;
                privateToken = res.body.token;

                request.post('/users')
                  .send(regularUserParams2)
                  .end((err, res) => {
                    privateUser2 = res.body.newUser;
                    privateToken2 = res.body.token;
                    done();
                  });
              });
          });
      });
  });

  after(() => model.sequelize.sync({ force: true }));

  it('should correctly create test roles & user', () => {
    expect(adminRole.title).to.equal(adminRoleParams.title);
    expect(regularRole.title).to.equal(regularRoleParams.title);
    expect(adminUser.email).to.equal(adminUserParams.email);
    expect(privateUser.email).to.equal(regularUserParams.email);
    expect(adminUser.id).to.equal(1);
    expect(privateUser.id).to.equal(2);
  });

  describe('REQUESTS', () => {
    beforeEach((done) => {
      publicDocumentParams.UserId = adminUser.id;
      model.Document.create(publicDocumentParams)
        .then((createdPublicDocument) => {
          publicDocument = createdPublicDocument;
          done();
        });
    });

    afterEach(() => model.Document.destroy({ where: {} }));

    describe('POST: (/documents) - CREATE A DOCUMENT', () => {
      it('should create a document for a validated user', (done) => {
        documentParams.UserId = adminUser.id;
        request.post('/documents')
          .set({ Authorization: publicToken })
          .send(documentParams)
          .end((error, response) => {
            expect(response.status).to.equal(201);
            expect(response.body.title).to.equal(documentParams.title);
            expect(response.body.content)
              .to.equal(documentParams.content);
            done();
          });
      });
      it('should not create a document without all required fields',
        (done) => {
          const invalidDocument = { title: 'I have no content' };
          request.post('/documents')
            .set({ Authorization: publicToken })
            .send(invalidDocument)
            .expect(500, done);
        });
    });
    describe('Requests for Documents', () => {
      describe('GET: (/documents) - GET ALL DOCUMENTS', () => {
        it('should not return documents if no token is provided', (done) => {
          request.get('/documents')
            .expect(401, done);
        });
        it('should not return documents if invalid token is provided',
          (done) => {
            request.get('/documents')
              .set({ Authorization: 'ADRYDUIGUtrtrr6e' })
              .expect(401, done);
          });
        it('should return all documents when valid token is provided',
          (done) => {
            request.get('/documents')
              .set({ Authorization: publicToken })
              .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(Array.isArray(response.body)).to.be.true;
                expect(response.body.length).to.be.greaterThan(0);
                expect(response.body[0].title)
                  .to.equal(publicDocumentParams.title);
                done();
              });
          });
      });
    });
  });
});

