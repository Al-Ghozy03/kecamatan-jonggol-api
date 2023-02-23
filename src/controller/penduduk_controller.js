const penduduk = require("../database/penduduk");
const Client = require("./client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check } = require("express-validator");
require("dotenv").config();

class Penduduk extends Client {
  async register(req, res) {
    try {
      const body = req.body;
      const check = await penduduk.findOne({ nik: body.nik });
      if (check) return super.response(res, 404, "nik sudah terdaftar");
      body.password = await bcrypt.hashSync(body.password, 12);
      const data = await penduduk.create(body);
      const token = jwt.sign(
        { id: data._id, role: "penduduk" },
        process.env.JWT_SIGN,
        {
          expiresIn: "1d",
        }
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
      const { nik, password } = req.body;
      const check = await penduduk.findOne({ nik });
      if (!check) super.response(res, 404, "nik tidak ditemukan");
      const verify = await bcrypt.compareSync(password, check.password);
      if (!verify) return super.response(res, 401, "password salah");
      const token = jwt.sign(
        { id: check._id, role: "penduduk" },
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
  async edit(req, res) {
    try {
      const { id } = req.params;
      const check = await penduduk.findById(id);
      if (!check) return super.response(res, 404, "penduduk tidak ditemukan");
      await penduduk.updateOne({ _id: check._id }, { $set: { ...req.body } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 200, er);
    }
  }
}

module.exports = new Penduduk();
