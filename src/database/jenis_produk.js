const dbconnection = require("./db_connection");

const jenisProduk = dbconnection.model("jenis_produk", {
  nama: {
    type: String,
    default: null,
  },
});
module.exports = jenisProduk
