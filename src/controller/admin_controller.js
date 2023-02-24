const admin = require("../database/admin");
const Client = require("./client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class Admin extends Client {
  async register(req, res) {
    try {
      let body = req.body;
      const check = await admin.findOne({ email: body.email });
      if (check) super.response(res, 400, "email sudah terdaftar");
      body.password = await bcrypt.hashSync(body.password, 10);
      const data = await admin.create(body);
      const token = jwt.sign(
        { id: data._id, role: "admin" },
        process.env.JWT_SIGN,
        { expiresIn: "1d" }
      );
      res.cookie("token", token, { httpOnly: true });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const check = await admin.findOne({ email });
      if (!check) return super.response(res, 404, "email tidak ditemukan");

      const verify = await bcrypt.compareSync(password, check.password);
      if (!verify) return super.response(res, 400, "password salah");
      const token = jwt.sign(
        { id: check._id, role: "admin" },
        process.env.JWT_SIGN,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, { httpOnly: true });
      return super.response(res, 200);
    } catch (er) {
      return super.response(res, 500, er);
    }
  }
}

module.exports = new Admin();
