const { ObjectId } = require("mongodb");
const dbconnection = require("./db_connection");

const gallery = dbconnection.model("gallery", {
  id_album: {
    type: ObjectId,
    require: true,
  },
  nama: {
    type: String,
    default: null,
  },
  deskripsi: {
    type: String,
    default: null,
  },
  thumbnail: {
    type: String,
    default: null,
  },
  id_thumbnail: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});
module.exports = gallery;
