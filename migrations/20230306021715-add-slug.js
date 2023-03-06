"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("admins", "slug", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("albums", "slug", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("berita", "slug", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("desas", "slug", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("galeris", "slug", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("layanans", "slug", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("ormas", "slug", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("pegawais", "slug", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("penduduks", "slug", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("sarana_keagamaans", "slug", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("sekolahs", "slug", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.removeColumn("bumds","slug")
  },
};
