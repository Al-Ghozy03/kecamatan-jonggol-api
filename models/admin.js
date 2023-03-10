"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      admin.belongsTo(models.role, { foreignKey: "id_role", as: "role" });
      admin.belongsTo(models.desa, { foreignKey: "id_desa" });
    }
  }
  admin.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      id_role: DataTypes.INTEGER,
      slug: DataTypes.STRING,
      id_desa: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "admin",
    }
  );
  return admin;
};
