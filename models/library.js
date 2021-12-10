'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Library extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Faculty, Book }) {
      // define association here
      this.hasMany(Book, { foreignKey: 'libraryId', as: 'book', onDelete: 'cascade', hooks: true  });
      this.belongsTo(Faculty, { foreignKey: 'facultyId', as: 'faculty' });
    }
  };
  Library.init({
    librarian:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i
      }
    },
    opentime:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    booknumber:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    floor:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    working:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
    
  }, {
    sequelize,
    modelName: 'Library',
  });
  return Library;
};