'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class traffic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  traffic.init({
    user_agent: DataTypes.STRING,
    ip: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'traffic',
  });
  return traffic;
};