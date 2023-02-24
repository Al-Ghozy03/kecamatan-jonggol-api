const role = require("../database/role");

role.insertMany([
  {
    role_name: "ADMINISTRATOR",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    role_name: "SEKRETARIS KECAMATAN",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    role_name: "KEPALA DESA",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);
