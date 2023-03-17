const bumd = require("../../models").bumd;
const desa = require("../../models").desa;
const Client = require("./client");
const jwt = require("jsonwebtoken")

class Bumd extends Client {
  async create(req, res) {
    try {
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const body = req.body;
      const checkDesa = await desa.findByPk(body.id_desa);
      if (!checkDesa) return super.response(res, 404, "desa tidak ditemukan");
      bumd.create(body);
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
      const { id } = req.params;
      const data = await bumd.findByPk(id);
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      if (req.body.id_desa !== undefined) {
        const checkDesa = await desa.findByPk(req.body.id_desa);
        if (!checkDesa) return super.response(res, 404, "desa tidak ditemukan");
      }
      await bumd.update(req.body, { where: { id } });
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
      const { id } = req.params;
      const data = await bumd.findByPk(id);
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      await bumd.destroy({ where: { id } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const { page, limit } = req.query;
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const size = (parseInt(page) - 1) * parseInt(limit);
      const { count, rows } = await bumd.findAndCountAll({
        ...(page !== undefined &&
          limit !== undefined && {
            offset: size,
            limit: parseInt(limit),
          }),
        attributes: [
          "id",
          "nomor_perdes",
          "tanggal_perdes",
          "keterangan",
          "id_desa",
        ],
        include: {
          model: desa,
          attributes: ["nama_desa", "kepala_desa", "longtitude", "latitude"],
        },
      });
      return super.responseWithPagination(
        res,
        200,
        null,
        rows,
        count,
        Math.ceil(count / parseInt(limit)),
        parseInt(page)
      );
    } catch (er) {
      console.log(er);
      return super.responseWithPagination(res, 500, er);
    }
  }
  async total(req, res) {
    try {
      const { id_desa } = req.query;
      const { count } = await bumd.findAndCountAll({
        ...(id_desa !== undefined && { where: { id_desa } }),
      });
      return super.response(res, 200, null, count);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
}

module.exports = new Bumd();
