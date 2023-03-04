"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class galeri extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      galeri.belongsTo(models.album, { foreignKey: "id", as: "cover" });
    }
  }
  galeri.init(
    {
      nama: DataTypes.STRING,
      deskripsi: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      id_album: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "galeri",
    }
  );
  return galeri;
};
