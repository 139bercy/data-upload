const Sequelize = require("sequelize");
const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');

//  règles proche de celle de l'ANSSI
const schemaPasswordValidation = new passwordValidator();
schemaPasswordValidation.is().min(14)                 // Minimum length 14
// .is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                // Must have digits
// .has().not().spaces()                           // Should not have spaces
// .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

const { passwordValidation } = require('../config/auth.config');

module.exports = (sequelize) => {
  let User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      // get() {
      //   return () => this.getDataValue('password')
      // },
      validate: {
        isString(value) {
          if (passwordValidation && !schemaPasswordValidation.validate(value)) {
             throw new Error("Le mot de passe n'est pas suffisamment sécurisé !");
          }
        }
      }
    },
    enable: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    resetPasswordToken: {
      type: Sequelize.STRING,
      // get() {
      //   return () => this.getDataValue('resetPasswordToken')
      // }
    },
    resetPasswordExpires: {
      type: Sequelize.DATE,
      // get() {
      //   return () => this.getDataValue('resetPasswordExpires')
      // }
    }
  });

  User.prototype.validPassword = async function validPassword(password) {
    return await bcrypt.compare(password, this.password)
  };

  User.addHook('beforeSave', 'encryptPassword', async (user) => {
    if (user.password && user.changed('password')) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }
  });

  return User;
};
