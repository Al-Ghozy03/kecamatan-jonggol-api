'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kesehatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      kesehatan.belongsTo(models.desa,{foreignKey:"id_desa"})
    }
  }
  kesehatan.init({
    slug: DataTypes.STRING,
    nama: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    thumbnail: DataTypes.STRING,
    id_thumbnail: DataTypes.STRING,
    web: DataTypes.STRING,
    maps: DataTypes.STRING,
    kontak: DataTypes.STRING,
    id_desa: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'kesehatan',
  });
  return kesehatan;
};