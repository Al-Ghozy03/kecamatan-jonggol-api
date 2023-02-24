const { ObjectId } = require("mongodb");
const role_action = require("../database/role_action");

role_action.insertMany([
  {
    id_role: "63f8136a11e475c3ee6c1285",
    id_action: "63f814a0a67481d9498ad8e1",
  },
  {
    id_role: "63f8136a11e475c3ee6c1285",
    id_action: "63f814a0a67481d9498ad8e2",
  },
  {
    id_role: "63f8136a11e475c3ee6c1286",
    id_action: "63f814a0a67481d9498ad8e1",
  },
  {
    id_role: "63f8136a11e475c3ee6c1287",
    id_action: "63f814a0a67481d9498ad8e2",
  },
]);
