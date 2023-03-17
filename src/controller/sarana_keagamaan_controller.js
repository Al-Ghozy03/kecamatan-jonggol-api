const { Op } = require("sequelize");
const saranakeagamaan = require("../../models").sarana_keagamaan;
const desa = require("../../models").desa;
const Client = require("./client");
const convert = require("./convert");
const jwt = require("jsonwebtoken")


class SaranaKeagamaan extends Client {
  async create(req, res) {
    try {
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const body = req.body;
      const checkDesa = await desa.findByPk(body.id_desa);
      if (!checkDesa) return super.response(res, 404, "desa tidak ditemukan");
      body.slug = convert.toSlug(body.nama_sarana);
      saranakeagamaan.create(body);
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
      const data = await saranakeagamaan.findOne({ where: { slug } });
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      if (req.body.id_desa !== undefined) {
        const checkDesa = await desa.findByPk(req.body.id_desa);
        if (!checkDesa) return super.response(res, 404, "desa tidak ditemukan");
      }
      if (req.body.nama_sarana !== undefined) {
        req.body.slug = convert.toSlug(req.body.nama_sarana);
      }
      await saranakeagamaan.update(req.body, { where: { slug } });
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
      const data = await saranakeagamaan.findOne({ where: { slug } });
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      await saranakeagamaan.destroy({ where: { slug } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const { page, limit, id_desa, key } = req.query;
      const size = (parseInt(page) - 1) * parseInt(limit);

      const { count, rows } = await saranakeagamaan.findAndCountAll({
        where: {
          ...((id_desa !== undefined) & { id_desa }),
          ...((key !== undefined) & { nama_sarana: { [Op.substring]: key } }),
        },
        ...(page !== undefined &&
          limit !== undefined && {
            offset: size,
            limit: parseInt(limit),
          }),
        attributes: ["slug", "nama_sarana", "pimpinan", "keterangan", "alamat"],
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
        parseInt(parseInt(page))
      );
    } catch (er) {
      console.log(er);
      return super.responseWithPagination(res, 500, er);
    }
  }
}

module.exports = new SaranaKeagamaan();
