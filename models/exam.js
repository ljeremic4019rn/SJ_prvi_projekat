'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Subject}) {
      // define association here
      this.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' });
    }
  };
  Exam.init({
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    classroom:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    guard: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  }, {
    sequelize,
    modelName: 'Exam',
  });
  return Exam;
};