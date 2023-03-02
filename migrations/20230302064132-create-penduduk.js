"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("penduduks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama: {
        type: Sequelize.STRING,
      },
      alamat: {
        type: Sequelize.STRING,
      },
      rt: {
        type: Sequelize.STRING,
      },
      rw: {
        type: Sequelize.STRING,
      },
      dusun: {
        type: Sequelize.STRING,
      },
      nomor_kk: {
        type: Sequelize.STRING,
      },
      nik: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      jenis_kelamin: {
        type: Sequelize.ENUM("LAKI-LAKI", "PEREMPUAN"),
      },
      tempat_lahir: {
        type: Sequelize.STRING,
      },
      tanggal_lahir: {
        type: Sequelize.DATEONLY,
      },
      agama: {
        type: Sequelize.STRING,
      },
      pendidikan_dalam_kk: {
        type: Sequelize.STRING,
      },
      pendidikan_sedang_ditempuh: {
        type: Sequelize.STRING,
      },
      pekerjaan: {
        type: Sequelize.STRING,
      },
      kawin: {
        type: Sequelize.ENUM("belum kawin", "kawin"),
      },
      hubungan_keluarga: {
        type: Sequelize.STRING,
      },
      kewarganegaraan: {
        type: Sequelize.STRING,
      },
      nama_ayah: {
        type: Sequelize.STRING,
      },
      nama_ibu: {
        type: Sequelize.STRING,
      },
      golongan_darah: {
        type: Sequelize.ENUM(
          "A",
          "B",
          "AB",
          "O",
          "A+",
          "A-",
          "B+",
          "B-",
          "AB+",
          "AB-",
          "O+",
          "O-",
          "TIDAK TAHU"
        ),
      },
      akta_lahir: {
        type: Sequelize.STRING,
      },
      nomor_dokumen_paspor: {
        type: Sequelize.STRING,
      },
      tanggal_akhir_passport: {
        type: Sequelize.DATEONLY,
      },
      nomor_dokumen_KITAS: {
        type: Sequelize.STRING,
      },
      nik_ayah: {
        type: Sequelize.STRING,
      },
      nik_ibu: {
        type: Sequelize.STRING,
      },
      nomor_akta_perkawinan: {
        type: Sequelize.STRING,
      },
      tanggal_perkawinan: {
        type: Sequelize.DATEONLY,
      },
      nomor_akta_cerai: {
        type: Sequelize.STRING,
      },
      tanggal_perceraian: {
        type: Sequelize.DATEONLY,
      },
      cacat: {
        type: Sequelize.STRING,
      },
      cara_kb: {
        type: Sequelize.STRING,
      },
      hamil: {
        type: Sequelize.STRING,
      },
      alamat_sekarang: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("penduduks");
  },
};
