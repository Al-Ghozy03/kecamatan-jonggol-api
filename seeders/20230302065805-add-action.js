"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("actions", [
      {
        action_name: "DASHBOARD",
        description: "Mendapatkan hak untuk mengakses dashboard",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        action_name: "ADD_NEWS",
        description: "Memiliki akses untuk membuat berita",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        action_name: "ADD_NEWS",
        description: "Memiliki akses untuk membuat berita",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        action_name: "EDIT_NEWS",
        description: "Memiliki akses untuk mengubah berita",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        action_name: "DELETE_NEWS",
        description: "Memiliki akses untuk menghapus berita",
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
