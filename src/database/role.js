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

module.exports = role;
