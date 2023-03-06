"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      album.hasOne(models.galeri, { as: "cover", foreignKey: "id_album" });
    }
  }
  album.init(
    {
      nama_album: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "album",
    }
  );
  return album;
};
