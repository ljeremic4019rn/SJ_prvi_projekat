'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Libraries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Libraries');
  }
};