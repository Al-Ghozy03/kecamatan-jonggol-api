const dbconnection = require("./db_connection");

const ormas = dbconnection.model("ormas", {
  nama: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});
module.exports = ormas;
