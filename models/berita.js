"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class berita extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      berita.belongsTo(models.admin, { foreignKey: "id_admin", as: "author" });
    }
  }
  berita.init(
    {
      judul: DataTypes.STRING,
      konten: DataTypes.TEXT,
      thumbnail: DataTypes.STRING,
      id_thumbnail: DataTypes.STRING,
      id_admin: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "berita",
    }
  );
  return berita;
};
