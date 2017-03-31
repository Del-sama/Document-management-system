const expect = require('chai').expect;
const model = require('../../models');
const helper = require('../specHelper.js');

const userParams = helper.testUser;
const roleParams = helper.testRole;

const requiredFields = ['user_name', 'first_name', 'last_name', 'email', 'password', 'RoleId'];
const uniqueFields = ['user_name', 'email'];

describe('User Model', () => {
  describe('How User Model Works', () => {
    let user;
    before((done) => {
      model.Role.create(roleParams)
        .then((createdRole) => {
          userParams.RoleId = createdRole.id;
          return model.User.create(userParams);
        })
        .then((createdUser) => {
          user = createdUser;
          done();
        });
    });

    after(() => model.sequelize.sync({ force: true }));

    it('should be able to create a user', () => {
      expect(user).to.exist;
      expect(typeof user).to.equal('object');
    });
    it('should create a user with username, first & last name', () => {
      expect(user.userName).to.equal(userParams.userName);
      expect(user.firstName).to.equal(userParams.firstName);
      expect(user.lastName).to.equal(userParams.lastName);
    });
    it('should create a user with a valid email', () => {
      expect(user.email).to.equal(userParams.email);
    });
    it('should create a user with hashed password', () => {
      expect(user.password).to.not.equal(userParams.password);
    });
    it('should create a user with a defined Role', () => {
      model.User.findById(user.id, { include: [model.Role] })
        .then((foundUser) => {
          expect(foundUser.Role.title).to.equal(roleParams.title);
        });
    });

    it('should be able to update a user', (done) => {
      model.User.findById(user.id)
        .then((foundUser) => {
          return foundUser.update({ user_name: 'mogims' });
        })
        .then((updatedUser) => {
          expect(updatedUser.user_name).to.equal('mogims');
          done();
        });
    });
  });

  describe('How User model does Validation', () => {
    let user;
    beforeEach((done) => {
      model.Role.create(roleParams)
        .then((role) => {
          userParams.RoleId = role.id;
          user = model.User.build(userParams);
          done();
        });
    });

    afterEach(() => model.sequelize.sync({ force: true }));

    describe('Required Fields', () => {
      requiredFields.forEach((field) => {
        it(`requires ${field} field to create a user`, () => {
          user[field] = null;
          return user.save()
            .catch((error) => {
              expect(/notNull Violation/.test(error.message)).to.be.true;
            });
        });
      });
    });

    describe('Unique Fields', () => {
      uniqueFields.forEach((field) => {
        it(`requires ${field} field to be Unique`, () => {
          user.save()
            .then((firstUser) => {
              userParams.RoleId = firstUser.RoleId;
              return model.User.build(userParams).save();
            })
            .catch((error) => {
              expect(/UniqueConstraintError/.test(error.name)).to.be.true;
            });
        });
      });
    });

    describe('Mail Validation', () => {
      it('requires user mail to be authentic', () => {
        user.email = 'oredavids yahoo';
        return user.save()
          .then((unsavedUser) => {
            expect(unsavedUser).to.exist;
          })
          .catch((error) => {
            expect(/isEmail failed/.test(error.message)).to.be.true;
          });
      });
    });

    describe('Password Validation', () => {
      it.only('should be valid if compared', () => {
        user.save()
          .then((createdUser) => {
            expect(createdUser.validPassword(userParams.password)).to.be.true;
          });
      });
    });
  });
});
