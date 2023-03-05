'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sarana_keagamaan extends Model {
    static associate(models) {
      sarana_keagamaan.belongsTo(models.desa,{foreignKey:"id_desa"})
    }
  }
  sarana_keagamaan.init({
    nama_sarana: DataTypes.STRING,
    pimpinan: DataTypes.STRING,
    alamat: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    id_desa: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sarana_keagamaan',
  });
  return sarana_keagamaan;
};