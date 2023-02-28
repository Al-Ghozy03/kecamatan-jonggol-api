const dbconnection = require("./db_connection");

const tentang = dbconnection.model("tentang", {
  deskripsi: {
    type: String,
    default: null,
  },
});

module.exports = tentang;
