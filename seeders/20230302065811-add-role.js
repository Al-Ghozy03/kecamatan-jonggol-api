'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("roles",[
      {
        role_name:"ADMINISTRATOR",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        role_name:"KEPALA DESA",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        role_name:"SEKRETARIS",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
