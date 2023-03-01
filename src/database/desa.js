const dbconnection = require("./db_connection");

const desa = dbconnection.model("desa", {
  nama_desa: {
    type: String,
    required: true,
  },
  kepala_desa: {
    type: String,
    required: true,
  },
  longtitude: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});

module.exports = desa;
