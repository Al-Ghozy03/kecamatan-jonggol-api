"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class role_action extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      role_action.belongsTo(models.role, {
        foreignKey: "id",
        as: "role_action",
      });
      role_action.belongsTo(models.action, {
        foreignKey: "id_action",
        as: "action",
      });
    }
  }
  role_action.init(
    {
      id_role: DataTypes.INTEGER,
      id_action: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "role_action",
    }
  );
  return role_action;
};
