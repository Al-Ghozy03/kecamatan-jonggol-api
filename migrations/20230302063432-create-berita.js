'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('berita', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      judul: {
        type: Sequelize.STRING
      },
      konten: {
        type: Sequelize.TEXT
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      id_thumbnail: {
        type: Sequelize.STRING
      },
      id_admin: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "admins",
          key: "id",
          as: "id_admin",
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
    await queryInterface.dropTable('berita');
  }
};