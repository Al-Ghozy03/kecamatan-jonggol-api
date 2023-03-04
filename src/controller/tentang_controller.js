const { default: jwtDecode } = require("jwt-decode");
const tentang = require("../../models").tentang;
const Client = require("./client");

class Tentang extends Client {
  async create(req, res) {
    try {
      const checkAdmin = jwtDecode(req.headers.authorization);
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
      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const data = await tentang.findByPk(1);
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      await tentang.update(
        { deskripsi: req.body.deskripsi },
        { where: { id: 1 } }
      );
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const data = await tentang.findOne({ where: { id: 1 } });
      return super.response(res, 200, null, data);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
}

module.exports = new Tentang();
