const dbconnection = require("./db_connection");

const penduduk = dbconnection.model("penduduk", {
  nama: {
    type: String,
    default: null,
  },
  alamat: {
    type: String,
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
  dusun: {
    type: String,
    default: null,
  },
  nomor_kk: {
    type: String,
    default: null,
  },
  nik: {
    type: String,
    default: null,
    unique: true,
  },
  password: {
    type: String,
    default: null,
  },
  jenis_kelamin: {
    type: String,
    default: null,
  },
  tempat_lahir: {
    type: String,
    default: null,
  },
  tanggal_lahir: {
    type: String,
    default: null,
  },
  agama: {
    type: String,
    default: null,
  },
  pendidikan_dalam_kk: {
    type: String,
    default: null,
  },
  pendidikan_sedang_ditempuh: {
    type: String,
    default: null,
  },
  pekerjaan: {
    type: String,
    default: null,
  },
  kawin: {
    type: String,
    default: null,
  },
  hubungan_keluarga: {
    type: String,
    default: null,
  },
  kewarganegaraan: {
    type: String,
    default: null,
  },
  nama_ayah: {
    type: String,
    default: null,
  },
  nama_ibu: {
    type: String,
    default: null,
  },
  golongan_darah: {
    type: String,
    default: "TIDAK TAHU",
    enum: [
      "A",
      "B",
      "AB",
      "O",
      "A+",
      "A-",
      "B+",
      "B-",
      "AB+",
      "AB-",
      "O+",
      "O-",
      "TIDAK TAHU",
    ],
  },
  akta_lahir: {
    type: String,
    default: null,
  },
  nomor_dokumen_paspor: {
    type: String,
    default: null,
  },
  tanggal_akhir_passport: {
    type: String,
    default: null,
  },
  nomor_dokumen_KITAS: {
    type: String,
    default: null,
  },
  nik_ayah: {
    type: String,
    default: null,
  },
  nik_ibu: {
    type: String,
    default: null,
  },
  nomor_akta_perkawinan: {
    type: String,
    default: null,
  },
  tanggal_perkawinan: {
    type: String,
    default: null,
  },
  nomor_akta_cerai: {
    type: String,
    default: null,
  },
  tanggal_perceraian: {
    type: String,
    default: null,
  },
  cacat: {
    type: String,
    default: null,
  },
  cara_kb: {
    type: String,
    default: null,
  },
  hamil: {
    type: String,
    default: null,
  },
  alamat_sekarang: {
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

module.exports = penduduk;
