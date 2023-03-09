"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("admins", "id_desa", {
      type: Sequelize.INTEGER,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      references: {
        model: "desas",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
  },
};
