'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Exams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },

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
        unique: false
      },
      guard: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subjectId:{
        type: DataTypes.INTEGER,//proveri
        allowNull: false
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Exams');
  }
};