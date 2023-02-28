const dbconnection = require("./db_connection");

const album = dbconnection.model("album", {
  nama_album: {
    type: String,
    default: null,
  },
});

module.exports = album;
