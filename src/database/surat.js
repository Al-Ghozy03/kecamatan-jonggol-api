const { ObjectId } = require("mongodb");
const dbconnection = require("./db_connection");

const surat = dbconnection.model("surat", {
  id_penduduk: {
    type: ObjectId,
    default: null,
  },
  id_layanan: {
    type: ObjectId,
    default: null,
  },
  nomor_surat: {
    type: Number,
    default: 0,
  },
  // desa.id
  kepala_desa: {
    type: ObjectId,
    default: null,
  },
  bulan: {
    type: String,
    default: null,
  },
  tahun: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ["verifikasi", "diterima", "ditolak"],
    default: "verifikasi",
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

module.exports = surat;
