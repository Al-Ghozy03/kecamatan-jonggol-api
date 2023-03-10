const { default: jwtDecode } = require("jwt-decode");
const desa = require("../../models").desa;
const Client = require("./client");
const convert = require("./convert");

class Desa extends Client {
  async create(req, res) {
    try {
      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const body = req.body;
      body.slug = convert.toSlug(body.nama_desa);
      await desa.create(body);
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async edit(req, res) {
    try {
      const body = req.body;
      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { slug } = req.params;
      const data = await desa.findOne({ where: { slug } });
      if (body.nama_desa !== undefined) {
        body.slug = convert.toSlug(body.nama_desa);
      }
      await desa.update(req.body, { where: { slug } });
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async delete(req, res) {
    try {
      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { slug } = req.params;
      const data = await desa.findOne({ where: { slug } });
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      await data.destroy({ where: { id } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const data = await desa.findAll({
        attributes: [
          "id",
          "slug",
          "nama_desa",
          "kepala_desa",
          "longtitude",
          "latitude",
        ],
      });
      return super.response(res, 200, null, data);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
}

module.exports = new Desa();
