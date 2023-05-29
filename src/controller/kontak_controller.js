const Client = require("./client");
const convert = require("./convert");
const kontak = require("../../models").kontak;
const jwt = require("jsonwebtoken")
class Kontak extends Client {
  async create(req, res) {
    try {
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const body = req.body;
      body.slug = convert.toSlug(body.nama);
      await kontak.create(body);
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async edit(req, res) {
    try {
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { slug } = req.params;
      const body = req.body;
      const data = await kontak.findOne({ where: { slug } });
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      if (body.nama !== undefined) {
        body.nama = convert.toSlug(body.nama);
      }
      await kontak.update(body, { where: { slug } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async delete(req, res) {
    try {
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { slug } = req.params;
      const data = await kontak.findOne({ where: { slug } });
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      await kontak.destroy({ where: { slug } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const data = await kontak.findAll({
        attributes: ["slug", "nama", "no_hp"],
      });
      return super.response(res, 200, null, data);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
}

module.exports = new Kontak();
