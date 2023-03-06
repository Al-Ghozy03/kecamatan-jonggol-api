'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sekolah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      sekolah.belongsTo(models.desa,{foreignKey:"id_desa"})
    }
  }
  sekolah.init({
    nama_sekolah: DataTypes.STRING,
    npsn: DataTypes.STRING,
    bentuk_pendidikan: DataTypes.STRING,
    status: DataTypes.STRING,
    alamat: DataTypes.STRING,
    id_desa: DataTypes.INTEGER,
    slug: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'sekolah',
  });
  return sekolah;
};