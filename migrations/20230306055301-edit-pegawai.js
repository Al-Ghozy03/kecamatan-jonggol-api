"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("pegawais","pendudukan","pendidikan")
    // await queryInterface.addColumn("pegawais", "id_foto", {
    //   type: Sequelize.STRING,
    // });
  },

  async down(queryInterface, Sequelize) {
  },
};
