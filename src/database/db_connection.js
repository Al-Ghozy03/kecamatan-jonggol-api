const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.DB_URL || "mongodb://127.0.0.1:27017/sipaojol";
mongoose.set("strictQuery", false);
mongoose
  .connect(port)
  .then((res) => console.log("connected to database"))
  .catch((er) => console.log("not connected to database", er));

module.exports = mongoose;
