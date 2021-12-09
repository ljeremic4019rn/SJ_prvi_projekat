'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Faculty, Subject }) {
      // define association here
      this.belongsTo(Faculty, {foreignKey: 'id', as: 'facutly'});
      this.hasMany(Subject, { foreignKey: 'id', as: 'subject' });//ovo je mozda bespotrebno
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false
    },
    email:    {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Nije email"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    moderator: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    student: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    defaultScope:{
      attributes: { exclude: ['email','password'] }//todo ovo , mozda nije pravilno postavljeno, a mozda jeste
    },
    modelName: 'User',
  });
  return User;
};