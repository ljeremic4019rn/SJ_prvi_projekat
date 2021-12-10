'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Libraries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
      },
      facultyId:{
        type: DataTypes.INTEGER,
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
    await queryInterface.dropTable('Libraries');
  }
};