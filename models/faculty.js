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
    static associate({ User, Subject }) {
      // define association here
      this.hasMany(User, { foreignKey: 'userId', user, onDelete: 'cascade', hooks: true });
      this.hasMany(Subject, { foreignKey: 'subjectId', as: 'subject', onDelete: 'cascade', hooks: true  });
    }
  };
  Faculty.init({
    name:  {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    dean:  {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    accredited: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    street: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Faculty',
  });
  return Faculty;
};