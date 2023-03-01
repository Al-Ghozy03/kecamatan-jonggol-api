const dbconnection = require("./db_connection");

const aplikasiPemerintah = dbconnection.model("aplikasi_pemerintah", {
  nama: {
    type: String,
    default: null,
  },
  thumbnail: {
    type: String,
    default: null,
  },
  id_thumbnail: {
    type: String,
    default: null,
  },
  deskripsi: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});

module.exports = aplikasiPemerintah