'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Faculty, Exam }) {
      // define association here
      this.belongsTo(Faculty, { foreignKey: 'facultyId', as: 'faculty' });
      this.hasMany(Exam, { foreignKey: 'examId', as: 'exam', onDelete: 'cascade', hooks: true  });
    }
  };
  Subject.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    professor: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    assistent: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    points:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};