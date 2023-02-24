const { ObjectId } = require("mongodb");
const dbconnection = require("./db_connection");

const admin = dbconnection.model("admin", {
  email: {
    type: String,
    default: null,
    unique: true,
  },
  password: {
    type: String,
    default: null,
  },
  // role.id
  id_role: {
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

module.exports = admin;
