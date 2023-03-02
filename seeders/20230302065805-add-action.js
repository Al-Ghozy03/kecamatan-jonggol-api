"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("actions", [
      {
        action_name: "DASHBOARD",
        description: "Mendapatkan hak untuk mengakses dashboard",
      },
      {
        action_name: "ADD_NEWS",
        description: "Memiliki akses untuk membuat berita",
      },
      {
        action_name: "ADD_NEWS",
        description: "Memiliki akses untuk membuat berita",
      },
      {
        action_name: "EDIT_NEWS",
        description: "Memiliki akses untuk mengubah berita",
      },
      {
        action_name: "DELETE_NEWS",
        description: "Memiliki akses untuk menghapus berita",
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
