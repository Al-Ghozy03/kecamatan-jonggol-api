const { ObjectId } = require("mongodb");
const dbconnection = require("./db_connection");
const pegawai = dbconnection.model("pegawai", {
  nama_pegawai: {
    type: String,
    default: null,
  },
  tempat_lahir: {
    type: String,
    default: null,
  },
  tanggal_lahir: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    default: null,
  },
  nip: {
    type: String,
    default: null,
  },
  no_ktp: {
    type: String,
    default: null,
  },
  no_hp: {
    type: String,
    default: null,
  },
  jenis_kelamin: {
    type: String,
    default: null,
  },
  agama: {
    type: ObjectId,
    default: null,
  },
  status_kawin: {
    type: String,
    default: null,
  },
  jabatan: {
    type: String,
    default: null,
  },
  pangkat: {
    type: String,
    default: null,
  },
  pendudukan: {
    type: String,
    default: null,
  },
  alamat: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  pass_foto: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});
