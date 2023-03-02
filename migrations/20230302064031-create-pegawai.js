'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pegawais', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      tempat_lahir: {
        type: Sequelize.STRING
      },
      tanggal_lahir: {
        type: Sequelize.DATEONLY
      },
      status: {
        type: Sequelize.STRING
      },
      no_ktp: {
        type: Sequelize.STRING
      },
      no_hp: {
        type: Sequelize.STRING
      },
      jenis_kelamin: {
        type: Sequelize.STRING
      },
      agama: {
        type: Sequelize.STRING
      },
      status_kawin: {
        type: Sequelize.STRING
      },
      jabatan: {
        type: Sequelize.STRING
      },
      pangkat: {
        type: Sequelize.STRING
      },
      pendudukan: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      pass_foto: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('pegawais');
  }
};