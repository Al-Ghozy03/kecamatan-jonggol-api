const dbconnection = require("./db_connection");

const hub_keluarga = dbconnection.model("hub_keluarga", {
  nama: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = hub_keluarga;
