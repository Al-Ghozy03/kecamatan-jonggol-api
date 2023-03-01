const dbconnection = require("./db_connection");

const layanan = dbconnection.model("layanan", {
  nama: {
    type: String,
    default: null,
  },
  syarat: {
    type: String,
    default: null,
  },
  template: {
    type: String,
    default: null,
  },
  id_template: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});

module.exports = layanan;
