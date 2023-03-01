const { ObjectId } = require("mongodb");
const dbconnection = require("./db_connection");

const berita = dbconnection.model("berita", {
  // admin.id
  id_admin: {
    type: ObjectId,
    default: null,
  },
  judul: {
    type: String,
    default: null,
  },
  konten: {
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

module.exports = berita;
