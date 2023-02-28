const { ObjectId } = require("mongodb");
const dbconnection = require("./db_connection");
const bcrypt = require("bcrypt");

const admin = dbconnection.model("admin", {
  email: {
    type: String,
    default: null,
    unique: true,
  },
  nama: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  // role.id
  id_role: {
    type: ObjectId,
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

// admin.create({
//   email: "jonggoladmin@gmail.com",
//   password: bcrypt.hashSync("adminjonggol123", 10),
//   id_role: "63fc1cc3119a179746bc9fc0",
// }).then(res=>console.log("berhasil")).catch(er=>console.log(er));

module.exports = admin;
