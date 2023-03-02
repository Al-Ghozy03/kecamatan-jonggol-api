"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("role_actions", [
      {
        id_role:1,
        id_action:1,
      },
      {
        id_role:1,
        id_action:2,
      },
      {
        id_role:1,
        id_action:3,
      },
      {
        id_role:2,
        id_action:1,
      },
      {
        id_role:3,
        id_action:1,
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
