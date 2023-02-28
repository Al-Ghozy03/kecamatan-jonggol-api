const { ObjectId } = require("mongodb");
const dbconnection = require("./db_connection");

const umkm = dbconnection.model("umkm", {
  no_ktp: {
    type: String,
    default: null,
  },
  nama_jalan: {
    type: String,
    default: null,
  },
  blok: {
    type: String,
    default: null,
  },
  no: {
    type: Number,
    default: null,
  },
  rt: {
    type: String,
    default: null,
  },
  rw: {
    type: String,
    default: null,
  },
  id_penduduk: {
    type: ObjectId,
    default: null,
  },
  id_desa: {
    type: ObjectId,
    default: null,
  },
  id_produk: {
    type: ObjectId,
    default: null,
  },
});

module.exports = umkm;
