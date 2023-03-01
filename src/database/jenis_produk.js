const dbconnection = require("./db_connection");

const jenisProduk = dbconnection.model("jenis_produk", {
  nama: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});
module.exports = jenisProduk
