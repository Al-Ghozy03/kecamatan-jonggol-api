'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pegawai.init({
    nama: DataTypes.STRING,
    tempat_lahir: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATEONLY,
    status: DataTypes.STRING,
    no_ktp: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING,
    agama: DataTypes.STRING,
    status_kawin: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    pangkat: DataTypes.STRING,
    pendidikan: DataTypes.STRING,
    alamat: DataTypes.STRING,
    email: DataTypes.STRING,
    pass_foto: DataTypes.STRING,
    slug: DataTypes.STRING,
    id_foto: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'pegawai',
  });
  return pegawai;
};