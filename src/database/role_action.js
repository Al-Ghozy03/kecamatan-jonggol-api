const { ObjectId } = require("mongodb");
const dbconnection = require("./db_connection");

const role_action = dbconnection.model("role_action", {
  // role.id
  id_role: {
    type: ObjectId,
    default: null,
  },
  // action.id
  id_action: {
    type: ObjectId,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});

// role_action
//   .insertMany([
//     {
//       id_role: "63fc1cc3119a179746bc9fc0",
//       id_action: "63fc1bbc40e351b13ec27a18",
//     },
//     {
//       id_role: "63fc1cc3119a179746bc9fc0",
//       id_action: "63fc1bbc40e351b13ec27a19",
//     },
//     {
//       id_role: "63fc1cc3119a179746bc9fc0",
//       id_action: "63fc1bbc40e351b13ec27a1a",
//     },
//     {
//       id_role: "63fc1cc3119a179746bc9fc1",
//       id_action: "63fc1bbc40e351b13ec27a1a",
//     },
//     {
//       id_role: "63fc1cc3119a179746bc9fc2",
//       id_action: "63fc1bbc40e351b13ec27a19",
//     },
//   ])
//   .then((res) => console.log("berhasil"))
//   .catch((er) => console.log("gagal", er));

module.exports = role_action;
