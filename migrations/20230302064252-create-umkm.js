'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('umkms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_ktp: {
        type: Sequelize.STRING
      },
      nama_jalan: {
        type: Sequelize.STRING
      },
      blok: {
        type: Sequelize.STRING
      },
      no: {
        type: Sequelize.STRING
      },
      rt: {
        type: Sequelize.STRING
      },
      rw: {
        type: Sequelize.STRING
      },
      jenis_produk: {
        type: Sequelize.STRING
      },
      id_penduduk: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "penduduks",
          key: "id",
          as: "id_penduduk",
        },
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
    await queryInterface.dropTable('umkms');
  }
};