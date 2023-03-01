const dbconnection = require("./db_connection");

const agama = dbconnection.model("agama", {
  nama: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});

module.exports = agama;
