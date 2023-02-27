const dbconnection = require("./db_connection");

const action = dbconnection.model("action", {
  action_name: {
    type: String,
  },
  description: {
    type: String,
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

// action
//   .insertMany([
//     {
//       action_name: "DASHBOARD",
//       description: "mendapatkan akses untuk halaman dashboard",
//     },
//     {
//       action_name: "EDIT_SURAT",
//       description: "mendapatkan akses untuk mengedit surat",
//     },
//     {
//       action_name: "ADD_ADMIN",
//       description: "bisa menambahkan admin",
//     },
//   ])
//   .then((res) => console.log("berhasil"))
//   .catch((er) => console.log("gagal cuy", er));

module.exports = action;
