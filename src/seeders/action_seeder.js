const action = require("../database/action");

action.insertMany([
  {
    action_name: "DASHBOARD",
    description: "mendapatkan akses untuk halaman dashboard",
  },
  {
    action_name: "EDIT_SURAT",
    description: "mendapatkan akses untuk mengedit surat",
  },
  {
    action_name: "ADD_ADMIN",
    description: "bisa menambahkan admin",
  },
]);
