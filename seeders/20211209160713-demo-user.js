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
      await queryInterface.bulkInsert('Users', [
      {
        //id: 1,
        name: 'John Doe',
        birthday: '01.02.2000',
        email: 'john@doe.com',
        username: 'jdoe',
        password: '1234',
        admin: true,
        moderator: false,
        student: false
      },
      {
      // id: 2,
        name: 'nikola petrovic',
        birthday: '01.02.2002',
        email: 'nikola@petrov.com',
        username: 'npetro',
        password: '1233',
        admin: true,
        moderator: false,
        student: false
      }
    
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
