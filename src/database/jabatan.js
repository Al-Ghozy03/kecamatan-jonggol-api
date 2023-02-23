const dbconnection = require("./db_connection");

const jabatan = dbconnection.model("jabatan", {
  nama: {
    type: String,
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

module.exports = jabatan;
