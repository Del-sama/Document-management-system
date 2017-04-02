const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
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
      validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },

      generateHash() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
      }
    },

    hooks: {
      beforeCreate: (newUser) => {
        newUser.generateHash();
      },
      beforeUpdate: (newUser) => {
        newUser.generateHash();
      }
    }
  });
  return User;
};
