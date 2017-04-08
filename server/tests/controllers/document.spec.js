const app = require('../../server');
const request = require('supertest')(app);
const expect = require('chai').expect;
const model = require('../../models');
const helper = require('../specHelper');

const documentParams = helper.testDocument;
const userParams = helper.testUser;

const requiredFields = ['title', 'content', 'UserId', 'access', 'publishedDate'];

describe('Document Model', () => {
  describe('How Document Model Works', () => {
    let document;
    let user;

    before((done) => {
      model.Role.create(helper.testRole)
        .then((createdRole) => {
          userParams.RoleId = createdRole.id;
          return model.User.create(userParams);
        })
        .then((createdUser) => {
          user = createdUser;
          documentParams.UserId = user.id;
          done();
        });
    });

    beforeEach(() => {
      document = model.Document.build(documentParams);
    });

    afterEach(() => model.Document.destroy({ where: {} }));

    after(() => model.sequelize.sync({ force: true }));

    it('should be able to create a document', (done) => {
      document.save()
        .then((createdDocument) => {
          expect(createdDocument).to.exist;
          expect(typeof createdDocument).to.equal('object');
          done();
        });
    });
    it('should create a document with title and content', (done) => {
      document.save()
        .then((createdDocument) => {
          expect(createdDocument.title).to.equal(documentParams.title);
          expect(createdDocument.content).to.equal(documentParams.content);
          done();
        });
    });
    it('should create a document with correct UserId', (done) => {
      document.save()
        .then((createdDocument) => {
          expect(createdDocument.UserId).to.equal(user.id);
          done();
        });
    });
    it('should create a document with published date', (done) => {
      document.save()
      .then((createdDocument) => {
        expect(createdDocument.publishedDate).to.exist;
        done();
      });
    });
    it('should create a document with access set to public', (done) => {
      document.save()
        .then((createdDocument) => {
          expect(createdDocument.access).to.equal('public');
          done();
        });
    });
  });
});
