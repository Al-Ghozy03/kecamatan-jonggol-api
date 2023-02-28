const dbconnection = require("./db_connection");

const video = dbconnection.model("video", {
  nama: {
    type: String,
    default: null,
  },
  thumbnail: {
    type: String,
    default: null,
  },
  youtube: {
    type: String,
    default: null,
  },
});

module.exports = video