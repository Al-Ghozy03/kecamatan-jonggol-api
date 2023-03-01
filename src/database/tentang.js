const dbconnection = require("./db_connection");

const tentang = dbconnection.model("tentang", {
  deskripsi: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});

module.exports = tentang;
