const dbconnection = require("./db_connection");

const album = dbconnection.model("album", {
  nama_album: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});

module.exports = album;
