'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Library, User }) {
      // define association here
      this.belongsTo(Library, { foreignKey: 'libraryId', as: 'library' });
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }
  };
  Book.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i
      }
    },
    writer:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i
      }
    },
    genre:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i
      }
    },
    desciption:{
      type: DataTypes.STRING(2048),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    relesedate:{
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true
      }
    },
    publisher:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i
      }
    }
    
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};