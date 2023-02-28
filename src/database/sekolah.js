const { ObjectId } = require("mongodb");
const dbconnection = require("./db_connection");

const sekolah = dbconnection.model("sekolah", {
  nama_sekolah: {
    type: String,
    default:null
  },
  npsn: {
    type: String,
    default:null
  },
  status: {
    type: String,
    default:null
  },
  alamat: {
    type: String,
    default:null
  },
//   bentuk_pendidikan.id
  id_bp: {
    type: ObjectId,
    default:null
  },
  id_desa: {
    type: ObjectId,
    default:null
  },
});

module.exports = sekolah