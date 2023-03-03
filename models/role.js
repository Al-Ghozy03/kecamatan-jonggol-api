"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      role.hasMany(models.role_action, {
        foreignKey: "id_role",
        as: "role_action",
      });
    }
  }
  role.init(
    {
      role_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "role",
    }
  );
  return role;
};
