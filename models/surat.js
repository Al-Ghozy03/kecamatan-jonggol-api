"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class surat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      surat.belongsTo(models.penduduk, { foreignKey: "id_penduduk" });
      surat.belongsTo(models.layanan, { foreignKey: "id_layanan" });
      surat.belongsTo(models.desa, { foreignKey: "id_desa" });
    }
  }
  surat.init(
    {
      nomor_surat: DataTypes.STRING,
      bulan: DataTypes.STRING,
      tahun: DataTypes.STRING,
      status: DataTypes.ENUM("diproses", "ditolak", "diterima"),
      id_penduduk: DataTypes.INTEGER,
      id_layanan: DataTypes.INTEGER,
      id_desa: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "surat",
    }
  );
  return surat;
};
