const dbconnection = require("./db_connection");

const kewarganegaraan = dbconnection.model("kewarganegaraan", {
  nama: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = kewarganegaraan;
