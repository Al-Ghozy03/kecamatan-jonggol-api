'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class umkm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  umkm.init({
    no_ktp: DataTypes.STRING,
    nama_jalan: DataTypes.STRING,
    blok: DataTypes.STRING,
    no: DataTypes.STRING,
    rt: DataTypes.STRING,
    rw: DataTypes.STRING,
    jenis_produk: DataTypes.STRING,
    id_penduduk: DataTypes.INTEGER,
    id_desa: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'umkm',
  });
  return umkm;
};