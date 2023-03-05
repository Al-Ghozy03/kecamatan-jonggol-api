const { default: jwtDecode } = require("jwt-decode");
const { Op } = require("sequelize");
const sekolah = require("../../models").sekolah;
const desamodel = require("../../models").desa;
const Client = require("./client");

class Sekolah extends Client {
  async create(req, res) {
    try {
      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const body = req.body;
      const checkDesa = await desamodel.findByPk(body.id_desa);
      if (!checkDesa) return super.response(res, 404, "desa tidak ditemukan");
      sekolah.create(body);
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
      const { id } = req.params;
      const data = await sekolah.findByPk(id);
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      if (req.body.id_desa !== undefined) {
        const checkDesa = await desamodel.findByPk(req.body.id_desa);
        if (!checkDesa) return super.response(res, 404, "desa tidak ditemukan");
      }
      await sekolah.update(req.body, { where: { id } });
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
      const { id } = req.params;
      const data = await sekolah.findByPk(id);
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      await sekolah.destroy({ where: { id } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const checkAdmin = jwtDecode(req.headers.authorization);
      const { page, limit, desa, status, bentuk_pendidikan, nama_sekolah } =
        req.query;
      const size = (parseInt(page) - 1) * parseInt(limit);

      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { count, rows } = await sekolah.findAndCountAll({
        attributes: [
          "id",
          "nama_sekolah",
          "npsn",
          "bentuk_pendidikan",
          "status",
          "alamat",
        ],
        where: {
          ...(status !== undefined && { status }),
          ...(bentuk_pendidikan !== undefined && { bentuk_pendidikan }),
          ...(nama_sekolah !== undefined && { nama_sekolah:{[Op.substring]:nama_sekolah} }),
        },
        ...(page !== undefined &&
          limit !== undefined && {
            offset: size,
            limit: parseInt(limit),
          }),
        include: {
          model: desamodel,
          attributes: ["nama_desa", "kepala_desa", "longtitude", "latitude"],
          ...(desa !== undefined && {
            where: { nama_desa: { [Op.substring]: desa } },
          }),
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

module.exports = new Sekolah();
