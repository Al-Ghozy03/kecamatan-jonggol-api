'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bumd extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bumd.init({
    nomor_perdes: DataTypes.STRING,
    tanggal_perdes: DataTypes.DATEONLY,
    keterangan: DataTypes.STRING,
    id_desa: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bumd',
  });
  return bumd;
};