const dbconnection = require("./db_connection");

const bentukPendidikan = dbconnection.model("bentuk_pendidikan", {
  nama: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});

module.exports = bentukPendidikan;
