'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('Faculties', [
      {
        //id: 1,
        name: 'fak1',
       // dean: 'marko',
        accredited: true,
        street: 'ulica',
        startDate: '01.02.2000'
      }
      /*
      {
       
        name: 'fak2',
        dean: 'markso',
        accredited: true,
        street: 'ulica',
        startDate: '12.12.12'
      }
    */
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
