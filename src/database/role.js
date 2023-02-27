const dbconnection = require("./db_connection");

const role = dbconnection.model("role", {
  role_name: {
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

// role
//   .insertMany([
//     {
//       role_name: "ADMINISTRATOR",
//     },
//     {
//       role_name: "SEKRETARIS KECAMATAN",
//     },
//     {
//       role_name: "KEPALA DESA",
//     },
//   ])
//   .then((res) => console.log("berhasil"))
//   .catch((er) => console.log("gagal cuy", er));

module.exports = role;
