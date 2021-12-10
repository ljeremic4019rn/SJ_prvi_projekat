'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Faculty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Library }) {
      // define association here
     this.hasMany(User, { foreignKey: 'facultyId', as: 'user', onDelete: 'cascade', hooks: true  });
     this.hasOne(Library, { foreignKey: 'facultyId', as: 'library', onDelete: 'cascade', hooks: true  });
    }
  };
  Faculty.init({
    name:  {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i
      }
    },
    dean:  {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i
      }
    },
    accredited: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    street: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    validate: {
      notEmpty: true,
    }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true
      }
    }
  }, {
    sequelize,
    modelName: 'Faculty',
  });
  return Faculty;
};