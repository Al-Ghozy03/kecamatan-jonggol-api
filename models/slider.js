'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class slider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  slider.init({
    judul: DataTypes.STRING,
    slug: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    thumbnail: DataTypes.STRING,
    id_thumbnail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'slider',
  });
  return slider;
};