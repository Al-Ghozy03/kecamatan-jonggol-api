const ormas = require("../../models").ormas;
const Client = require("./client");
const convert = require("./convert");
const jwt = require("jsonwebtoken")

class Ormas extends Client {
  async create(req, res) {
    try {
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const body = req.body;
      body.slug = convert.toSlug(body.nama_ormas);
      ormas.create(body);
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
      const data = await ormas.findOne({ where: { slug } });
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      if (req.body.nama_ormas !== undefined) {
        req.body.slug = convert.toSlug(req.body.nama_ormas);
      }
      await ormas.update(req.body, { where: { slug } });
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
      const data = await ormas.findOne({ where: { slug } })
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      await ormas.destroy({ where: { slug } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      const { page, limit } = req.query;
      const size = (parseInt(page) - 1) * parseInt(limit);

      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { count, rows } = await ormas.findAndCountAll({
        attributes:["slug","nama_ormas","kepanjangan"],
        ...(page !== undefined &&
          limit !== undefined && {
            offset: size,
            limit: parseInt(limit),
          }),
      });
      return super.responseWithPagination(
        res,
        200,
        null,
        rows,
        count,
        Math.ceil(count / parseInt(limit)),
        parseInt(parseInt(page))
      );
    } catch (er) {
      console.log(er);
      return super.responseWithPagination(res, 500, er);
    }
  }
}

module.exports = new Ormas();
