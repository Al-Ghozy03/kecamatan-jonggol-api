const { ObjectId } = require("mongodb");
const dbconnection = require("./db_connection");

const saranaKeagamaan = dbconnection.model("sarana_keagamaan", {
  pimpinan: {
    type: String,
    default:null
  },
  alamat: {
    type: String,
    default:null
  },
  keterangan: {
    type: String,
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

module.exports = saranaKeagamaan