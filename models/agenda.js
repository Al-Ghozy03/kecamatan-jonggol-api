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
      // define association here
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
    id_template: DataTypes.STRING,
    id_desa: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'agenda',
  });
  return agenda;
};