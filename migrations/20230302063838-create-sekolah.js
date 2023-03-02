'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sekolahs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_sekolah: {
        type: Sequelize.STRING
      },
      npsn: {
        type: Sequelize.STRING
      },
      bentuk_pendidikan: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      id_desa: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "desas",
          key: "id",
          as: "id_desa",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sekolahs');
  }
};