const { ObjectId } = require("mongodb");
const dbconnection = require("./db_connection");

const role_action = dbconnection.model("role_action", {
  id_role: {
    type: ObjectId,
    default: null,
  },
  id_action: {
    type: ObjectId,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = role_action;
