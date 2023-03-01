const { ObjectId } = require("mongodb");
const dbconnection = require("./db_connection");

const bumd = dbconnection.model("bumd", {
  nomor_perdes: {
    type: String,
    default:null
  },
  tanggal_perdes: {
    type: Date,
    default:null
  },
  keterangan: {
    type: Date,
    default:null
  },
  id_desa: {
    type: ObjectId,
    default:null
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});
module.exports = bumd