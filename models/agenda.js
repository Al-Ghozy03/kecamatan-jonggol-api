'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class agenda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      agenda.belongsTo(models.desa,{foreignKey:"id_desa"})
    }
  }
  agenda.init({
    nama_agenda: DataTypes.STRING,
    start: DataTypes.TIME,
    end: DataTypes.TIME,
    tanggal: DataTypes.DATEONLY,
    tempat: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    id_thumbnail: DataTypes.STRING,
    id_desa: DataTypes.INTEGER,
    slug: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'agenda',
  });
  return agenda;
};