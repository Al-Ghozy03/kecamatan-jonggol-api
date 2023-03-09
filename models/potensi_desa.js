'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class potensi_desa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      potensi_desa.belongsTo(models.penduduk,{foreignKey:"id_penduduk"})
      potensi_desa.belongsTo(models.desa,{foreignKey:"id_desa"})
    }
  }
  potensi_desa.init({
    nama_potensi: DataTypes.STRING,
    slug: DataTypes.STRING,
    kategori: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    thumbnail: DataTypes.STRING,
    id_thumbnail: DataTypes.STRING,
    id_desa: DataTypes.INTEGER,
    id_penduduk: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'potensi_desa',
  });
  return potensi_desa;
};