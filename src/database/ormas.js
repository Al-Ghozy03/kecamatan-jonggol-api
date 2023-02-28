const dbconnection = require("./db_connection");

const ormas = dbconnection.model("ormas", {
  nama: {
    type: String,
    default: null,
  },
});
module.exports = ormas;
