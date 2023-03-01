const { default: jwtDecode } = require("jwt-decode");
const tentang = require("../database/tentang");
const Client = require("./client");

class Tentang extends Client {
  async create(req, res) {
    try {
      const checkAdmin = jwtDecode(req.cookies.token);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const body = req.body;
      tentang.create(body);
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async edit(req, res) {
    try {
      const checkAdmin = jwtDecode(req.cookies.token);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { id } = req.params;
      const data = await tentang.findByIdAndUpdate(id, { $set: req.body });
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const data = await tentang.find({}, { deskripsi: "$deskripsi" }).limit(1);
      return super.response(res, 200, null, data[0]);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
}

module.exports = new Tentang();
