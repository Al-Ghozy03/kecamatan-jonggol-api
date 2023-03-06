"use strict";
const bcrypt = require("bcrypt");
const convert = require("../src/controller/convert");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("admins", [
      {
        email: "jonggoladmin@gmail.com",
        username: "admin jonggol",
        password: bcrypt.hashSync("adminjonggol123", 10),
        id_role: 1,
        slug: convert.toSlug("admin jonggol"),
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
