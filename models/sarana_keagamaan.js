'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sarana_keagamaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sarana_keagamaan.init({
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