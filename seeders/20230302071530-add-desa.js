"use strict";
const convert = require("../src/controller/convert");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("desas", [
      {
        nama_desa: "Jonggol",
        kepala_desa: "Mas uyi",
        longtitude: "107.0089223",
        latitude: "-6.4795862",
        slug: convert.toSlug("Jonggol"),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        nama_desa: "Sukajaya",
        kepala_desa: "Mas uyi",
        longtitude: "106.9793604",
        latitude: "-6.5527787",
        slug: convert.toSlug("sukajaya"),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        nama_desa: "Singajaya",
        kepala_desa: "Mas uyi",
        longtitude: "107.0089223",
        latitude: "-6.4795862",
        slug: convert.toSlug("singajaya"),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        nama_desa: "Balakambang",
        kepala_desa: "Mas uyi",
        longtitude: "107.0528904",
        latitude: "-6.5112738",
        slug: convert.toSlug("balakambang"),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        nama_desa: "Cibodas",
        kepala_desa: "Mas uyi",
        longtitude: "106.9947104",
        latitude: "-6.5024397",
        slug: convert.toSlug("cibodas"),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        nama_desa: "Sirnagalih",
        kepala_desa: "Mas uyi",
        longtitude: "107.0809468",
        latitude: "-6.472125",
        slug: convert.toSlug("sirnagalih"),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        nama_desa: "Sukasirna",
        kepala_desa: "Mas uyi",
        longtitude: "107.0371354",
        latitude: "-6.4950947",
        slug: convert.toSlug("sukasirna"),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        nama_desa: "Weninggalih",
        kepala_desa: "Mas uyi",
        longtitude: "107.0901754",
        latitude: "-6.4627367",
        slug: convert.toSlug("weninggalih"),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        nama_desa: "Bendungan",
        kepala_desa: "Mas uyi",
        longtitude: "107.0721014",
        latitude: "-6.4957797",
        slug: convert.toSlug("bendungan"),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        nama_desa: "Sukanegara",
        kepala_desa: "Mas uyi",
        longtitude: "107.0155304",
        latitude: "-6.5257746",
        slug: convert.toSlug("sukanegara"),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        nama_desa: "Singasari",
        kepala_desa: "Mas uyi",
        longtitude: "106.9816254",
        latitude: "-6.4761988",
        slug: convert.toSlug("singasari"),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        nama_desa: "Sukamanah",
        kepala_desa: "Mas uyi",
        longtitude: "107.0576232",
        latitude: "-6.4423099",
        slug: convert.toSlug("sukamanah"),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        nama_desa: "Sukagalih",
        kepala_desa: "Mas uyi",
        longtitude: "107.0938169",
        latitude: "-6.4857817",
        slug: convert.toSlug("sukagalih"),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        nama_desa: "Sukamaju",
        kepala_desa: "Mas uyi",
        longtitude: "106.8564841",
        latitude: "-6.6734486",
        slug: convert.toSlug("sukamaju"),
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
