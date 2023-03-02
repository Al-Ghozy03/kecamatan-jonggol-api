'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class layanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  layanan.init({
    nama: DataTypes.STRING,
    syarat: DataTypes.STRING,
    template: DataTypes.STRING,
    id_template: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'layanan',
  });
  return layanan;
};