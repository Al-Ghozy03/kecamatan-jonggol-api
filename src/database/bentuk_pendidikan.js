const dbconnection = require("./db_connection");

const bentukPendidikan = dbconnection.model("bentuk_pendidikan", {
  nama: {
    type: String,
    default: null,
  },
});

module.exports = bentukPendidikan;
