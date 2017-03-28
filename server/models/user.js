const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    RoleId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  }, {
    classMethods: {
      associate: (models) => {
        User.belongsTo(models.Role, {
          foreignKey: {
            name: 'RoleId',
            allowNull: false
          }
        });
        User.hasMany(models.Document, {
          foreignKey: 'UserId'
        });
      }
    },
    instanceMethods: {
      generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
      },
      validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },
    },
    hooks: {
      beforeCreate: (newUser) => {
        newUser.hashPassword();
      },
      beforeUpdate: (newUser) => {
        newUser.hashPassword();
      }
    }
  });
  return User;
};
