const { ObjectId } = require("mongodb");
const dbconnection = require("./db_connection");

const agenda = dbconnection.model("agenda", {
  nama: {
    type: String,
    default: null,
  },
  tanggal: {
    type: Date,
    default: null,
  },
  tempat: {
    type: String,
    default: null,
  },
  thumbnail: {
    type: String,
    default: null,
  },
  id_admin: {
    type: ObjectId,
    default: null,
  },
});
