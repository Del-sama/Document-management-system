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
        this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
        console.log('password ---------------->', this.password, password);
      },
      validPassword(password) {
        // console.log('password comparism ---------------->', password, this.password, bcrypt.compareSync(password, this.password));
        return bcrypt.compareSync(password, this.password);
      },
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
