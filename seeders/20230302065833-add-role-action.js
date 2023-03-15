"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("role_actions", [
      {
        id_role:1,
        id_action:1,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        id_role:1,
        id_action:2,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        id_role:1,
        id_action:3,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        id_role:2,
        id_action:1,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        id_role:3,
        id_action:1,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
