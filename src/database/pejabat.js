const { ObjectId } = require("mongodb");
const dbconnection = require("./db_connection");

const pejabat = dbconnection.model("pejabat", {
  id_jabatan: {
    type: ObjectId,
    default: null,
  },
  id_admin: {
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

module.exports = pejabat;
