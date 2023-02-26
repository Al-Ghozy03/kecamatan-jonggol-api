const role = require("../database/role");

role.insertMany([
  {
    role_name: "ADMINISTRATOR",
  },
  {
    role_name: "SEKRETARIS KECAMATAN",
  },
  {
    role_name: "KEPALA DESA",
  },
]);
