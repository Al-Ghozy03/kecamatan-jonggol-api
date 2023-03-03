"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class penduduk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      penduduk.belongsTo(models.desa, { foreignKey: "id_desa", as: "desa" });
    }
  }
  penduduk.init(
    {
      nama: DataTypes.STRING,
      alamat: DataTypes.STRING,
      rt: DataTypes.STRING,
      rw: DataTypes.STRING,
      nomor_kk: DataTypes.STRING,
      nik: DataTypes.STRING,
      password: DataTypes.STRING,
      jenis_kelamin: DataTypes.ENUM("LAKI-LAKI", "PEREMPUAN"),
      tempat_lahir: DataTypes.STRING,
      tanggal_lahir: DataTypes.DATEONLY,
      agama: DataTypes.INTEGER,
      pendidikan_dalam_kk: DataTypes.STRING,
      pendidikan_sedang_ditempuh: DataTypes.STRING,
      pekerjaan: DataTypes.STRING,
      kawin: DataTypes.ENUM("belum kawin", "kawin"),
      hubungan_keluarga: DataTypes.INTEGER,
      kewarganegaraan: DataTypes.INTEGER,
      nama_ayah: DataTypes.STRING,
      nama_ibu: DataTypes.STRING,
      golongan_darah: DataTypes.ENUM(
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
      akta_lahir: DataTypes.STRING,
      nomor_dokumen_paspor: DataTypes.STRING,
      tanggal_akhir_passport: DataTypes.DATEONLY,
      nomor_dokumen_KITAS: DataTypes.STRING,
      nik_ayah: DataTypes.STRING,
      nik_ibu: DataTypes.STRING,
      nomor_akta_perkawinan: DataTypes.STRING,
      tanggal_perkawinan: DataTypes.DATEONLY,
      nomor_akta_cerai: DataTypes.STRING,
      tanggal_perceraian: DataTypes.DATEONLY,
      cacat: DataTypes.STRING,
      cara_kb: DataTypes.STRING,
      hamil: DataTypes.STRING,
      alamat_sekarang: DataTypes.STRING,
      id_desa: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "penduduk",
    }
  );
  return penduduk;
};
