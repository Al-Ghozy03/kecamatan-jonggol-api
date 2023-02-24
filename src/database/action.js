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

module.exports = action
