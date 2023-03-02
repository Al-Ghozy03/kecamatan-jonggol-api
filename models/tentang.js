'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tentang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tentang.init({
    deskripsi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tentang',
  });
  return tentang;
};