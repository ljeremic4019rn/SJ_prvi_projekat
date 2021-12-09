'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Faculties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },

      name:  {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      dean:  {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      accredited: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      street: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
      },
      startDate: {
        type: DataTypes.DATE,
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
    await queryInterface.dropTable('Faculties');
  }
};